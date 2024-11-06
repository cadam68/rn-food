import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Linking, Platform, TouchableOpacity, ScrollView } from "react-native";
import { STYLES, dialCall, openGps, GUI, STORAGE } from "./../hooks/useTools";
import { Feather } from "@expo/vector-icons";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const getAllFavorites = async () => {
    let ids = [],
      allItems = [],
      i = 0;
    ids = await STORAGE.getItem("IDS");
    // console.log(ids)
    if (ids != null && ids.length > 0) {
      //!\ for loop is the only possibility dealing with async methods (don't work with foreach loop)
      for (i = 0; i < ids.length; i++) {
        let item = await STORAGE.getItem(ids[i]);
        if (item != null) allItems.push(item);
      }
    }
    allItems.sort((a, b) => a.name > b.name);
    setFavorites(allItems);
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <View style={{ flex: 1, borderColor: "red", borderBottomWidth: 1 }}>
      <GUI.TitleH1 text="Favorites" styleView={styles.container} />
      <GUI.Separator />
      <ScrollView showsVerticalScrollIndicator={false}>
        {favorites.map((result, i) => {
          return (
            <View key={i}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("ResultsShow", { id: result.id });
                }}>
                <GUI.TitleH1 text={result.name} styleView={styles.container} />
              </TouchableOpacity>
              <View style={[styles.container, { marginRight: 15 }]}>
                <View style={{ flexDirection: "row", alignContent: "space-between" }}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        openGps(result.coordinates.latitude, result.coordinates.longitude, result.display_address.join());
                      }}>
                      {result.display_address.map((item, i) => {
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
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginVertical: 10,
  },
  name: {
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
