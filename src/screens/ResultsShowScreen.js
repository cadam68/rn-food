import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Alert, Button, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome, Feather, Octicons } from "@expo/vector-icons";
import yelp from "../api/yelp";
import { STYLES, dialCall, openGps, GUI, STORAGE } from "../hooks/useTools";

const ResultsShowScreen = () => {
  const [result, setResult] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(-1);
  const [isOpen, setIsOpen] = useState(undefined);
  const [hours, setHours] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const getResult = async id => {
    try {
      const response = await yelp.get(`/${id}`);
      setResult(response.data);
      setOpenHours(response.data.hours);
    } catch (e) {
      console.log(`ERROR : ${e.message}`);
      Alert.alert("Oups", "Something went wrong, please try again later ...", [{ text: "OK", onPress: () => {} }], { cancelable: false });
    }
  };

  const setOpenHours = hours => {
    if (hours != undefined) {
      let item = hours.find(item => item.hours_type === "REGULAR");
      if (item != undefined) {
        let d = new Date();
        let n = (d.getDay() + 6) % 7;
        setIsOpen(item.is_open_now);
        let openHours = item.open
          .filter(item => item.day === n)
          .sort((a, b) => (a.start > b.start ? 1 : -1))
          .map(item => `${item.start.substr(0, 2)}:${item.start.substr(2, 2)}-${item.end.substr(0, 2)}:${item.end.substr(2, 2)}`);
        setHours(openHours);
      }
    }
  };

  const getReviews = async id => {
    try {
      const response = await yelp.get(`/${id}/reviews`, { params: { locale: "fr_FR" } });
      setReviews(response.data.reviews);
    } catch (e) {
      console.log(`ERROR : ${e.message}`);
      Alert.alert("Oups", "Something went wrong, please try again later ...", [{ text: "OK", onPress: () => {} }], { cancelable: false });
    }
  };

  const checkIfIsFavorite = async id => {
    let item = await STORAGE.getItem(id);
    setIsFavorite(item != null);
  };

  const handleFavorite = async id => {
    if (isFavorite) {
      await STORAGE.removeItem(id);
      let ids = await STORAGE.getItem("IDS");
      if (ids != null) {
        ids = ids.filter(item => item !== id);
        await STORAGE.setItem("IDS", ids);
      }
    } else {
      await STORAGE.setItem(id, {
        id: result.id,
        name: result.name,
        price: result.price,
        display_address: result.location.display_address,
        display_phone: result.display_phone,
        coordinates: result.coordinates,
      });
      let ids = await STORAGE.getItem("IDS");
      ids = ids == null ? [id] : [...ids, id];
      await STORAGE.setItem("IDS", ids);
    }
    await checkIfIsFavorite(id);
  };

  useEffect(() => {
    getResult(id);
    getReviews(id);
    checkIfIsFavorite(id);
  }, []);

  useEffect(() => {
    if (result != undefined && result.photos.length > 2) {
      let i = 0;
      setCurrentImage(0);
      const interval = setInterval(() => {
        i = (i + 1) % result.photos.length;
        setCurrentImage(i);
      }, 3000);
      return () => clearInterval(interval);
    } else if (result?.photos.length === 1) {
      setCurrentImage(0);
    }
  }, [result]);

  if (!result) return null;

  return (
    <View style={{ flex: 1, borderColor: "red", borderBottomWidth: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <GUI.TitleH1 text={result.name} styleView={[styles.container, { flex: 0 }]} />
        <Text style={{ color: "red", fontSize: 12, marginLeft: 8, top: 3, flex: 1 }}>{result.price}</Text>
        <TouchableOpacity onPress={() => handleFavorite(result.id)}>
          <FontAwesome name={isFavorite ? "heart" : "heart-o"} style={{ marginRight: 10 }} size={20} color="red" />
        </TouchableOpacity>
      </View>
      {result.photos.length > 0 && (
        <View style={{ borderColor: "red", borderWidth: 1, padding: 10 }}>
          {result.photos.map((item, i) => {
            const currentStyle = i === currentImage ? styles.image : styles.hidden;
            return <Image key={i} style={currentStyle} source={{ uri: item }} />;
          })}
        </View>
      )}
      <View style={[styles.container, { marginRight: 15 }]}>
        <View style={{ flexDirection: "row", alignContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                openGps(result.coordinates.latitude, result.coordinates.longitude, result.location.display_address.join());
              }}>
              {result.location.display_address.map((item, i) => {
                return (
                  <Text key={i} style={styles.name}>
                    {item}
                  </Text>
                );
              })}
            </TouchableOpacity>
          </View>
          <View>
            {result.phone != "" && (
              <TouchableOpacity
                onPress={() => {
                  dialCall(result.phone);
                }}
                style={{ flexDirection: "row" }}>
                <Feather name="phone" size={16} color="black" />
                <Text>{result.display_phone}</Text>
              </TouchableOpacity>
            )}
            {isOpen != undefined && (
              <View>
                <Text>{isOpen ? "open" : "close"}</Text>
                {hours.map((item, i) => {
                  return <Text key={i}>{item}</Text>;
                })}
              </View>
            )}
          </View>
        </View>
      </View>

      {!!reviews && reviews.length > 0 && (
        <View style={{ marginHorizontal: 15, flex: 1 }}>
          <GUI.TitleH1 text="Reviews" styleView={{ marginBottom: 10 }} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {reviews.map((item, i) => {
              return (
                <View key={i} style={{ marginBottom: 5 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <GUI.Stars nb={item.rating} count={5} />
                    <Text> {item.time_created}</Text>
                  </View>
                  <View>
                    <Octicons name="quote" size={12} color="gray" style={{ width: 15 }} />
                    <Text style={{ marginTop: -15 }}> {item.text}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
    resizeMode: "contain",
  },
  hidden: {
    display: "none",
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsShowScreen;
