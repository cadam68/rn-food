import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResultsDetail = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ResultsShow", { id: item.id });
      }}>
      <View style={styles.container}>
        {item.image_url === "" ? <Image style={styles.image} source={require("./../../assets/images/placeholder-image.png")} /> : <Image style={styles.image} source={{ uri: item.image_url }} />}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>
          {item.rating} Stars, {item.review_count} Reviews, at {(item.distance / 1000).toFixed(2)} km
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 4,
    marginBottom: 5,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "bold",
  },
});

export default ResultsDetail;
