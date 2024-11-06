import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { STORAGE } from "./../hooks/useTools";

const HeaderRight = () => {
  const navigation = useNavigation();

  const checkIfIsFavorites = async () => {
    let ids = await STORAGE.getItem("IDS");
    if (ids != null && ids.length > 0) {
      navigation.navigate("Favorites");
    }
  };

  return (
    <TouchableOpacity onPress={checkIfIsFavorites}>
      <FontAwesome name="heart-o" style={{ marginRight: 10 }} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderRight;
