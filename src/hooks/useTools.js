import React from "react";
import { View, Text, StyleSheet, TextInput, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const GUI = {
  Separator: function () {
    return <View style={styles.separator} />;
  },
  HelloWorld: function () {
    return <Text>Hello World !</Text>;
  },
  TextInput: function ({ value, onChangeText, name, ...props }) {
    return (
      <TextInput
        value={value}
        onChangeText={value => onChangeText(name, value)} //... Bind the name here
        {...props}
      />
    );
  },
  TitleH1: function ({ text, styleView }) {
    return (
      <View style={styleView}>
        <Text style={[STYLES.h1, { color: "#cccccc", position: "absolute", top: 1, left: 1 }]}>{text}</Text>
        <Text style={STYLES.h1}>{text}</Text>
      </View>
    );
  },
  Stars: function ({ nb, count }) {
    return (
      <View style={{ flexDirection: "row" }}>
        {Array(nb)
          .fill(null)
          .map((value, i) => {
            return <FontAwesome key={i} name="star" size={14} color="red" />;
          })}
        {Array(count - nb)
          .fill(null)
          .map((value, i) => {
            return <Feather key={i} name="star" size={14} color="red" />;
          })}
      </View>
    );
  },
};

export const MATH = {
  add: function (a, b) {
    return a + b;
  },
  randomRgb: function () {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
    // return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  },
  random: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
};

export const STYLES = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#7777FF",
    borderRadius: 1,
    paddingVertical: 10,
  },
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  h1: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const dialCall = number => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

export const openGps = (lat, lng, address) => {
  var scheme = Platform.OS === "ios" ? "maps:" : "geo:";
  var url = scheme + `${lat},${lng}?q=${address}`;
  // console.log(url);
  Linking.openURL(url);
};

export const STORAGE = {
  async setItem(key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error('AsyncStorage#setItem error: ' + error.message);
    }
  },

  async getItem(key) {
    return await AsyncStorage.getItem(key).then(result => {
      if (result) {
        try {
          result = JSON.parse(result);
        } catch (e) {
          // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
        }
      }
      return result;
    });
  },

  async removeItem(key) {
    return await AsyncStorage.removeItem(key);
  },

  async getAllKeys() {
    return await AsyncStorage.getAllKeys();
  },

  async removeAllItems() {
    const allKeys = await AsyncStorage.getAllKeys();
    // console.log('Storage remove allKeys', allKeys);
    // await Promise.all(allKeys.map(async key => await AsyncStorage.removeItem(key)));
    for await (let key of allKeys) await AsyncStorage.removeItem(key);
  },
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
    marginHorizontal: 15,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
