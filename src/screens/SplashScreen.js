import React, { useEffect } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";

const SplashScreen = ({ onSubmit }) => {
  const x = new Animated.Value(0);

  useEffect(() => {
    let timeout = setTimeout(() => {
      onSubmit();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Animated.timing(x, { toValue: 40, duration: 2000, useNativeDriver: false }).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onSubmit}>
        <View style={{ backgroundColor: "white", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 25 }}>
            Wel<Text style={{ color: "blue" }}>c</Text>ome
          </Text>
          <Text style={{ color: "red", fontSize: 30 }}>@</Text>
          <Text style={{ color: "red", fontSize: 25 }}>
            Business Se<Text style={{ color: "blue" }}>a</Text>rch
          </Text>
          <Animated.View style={{ position: "absolute", top: 200, left: 30, marginTop: x }}>
            <Octicons style={{ position: "absolute", top: 10, left: 5 }} name="search" size={400} color="#d2d2d2" />
            <Octicons style={{ position: "absolute", top: 0, left: 0 }} name="search" size={400} color="red" />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
