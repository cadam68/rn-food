import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit, searching }) => {
  const [elevationValue, setElevationValue] = useState(1);

  const styles = StyleSheet.create({
    backgroundStyle: {
      marginTop: 15,
      backgroundColor: "#f0eeee",
      marginHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      borderRadius: 5,
      elevation: elevationValue,
    },
    visible: {
      borderWidth: 1,
      borderColor: "black",
      borderStyle: "dashed",
    },
    inputStyle: {
      flex: 1,
      alignSelf: "stretch",
      fontSize: 18,
    },
    iconStyle: {
      fontSize: 35,
      color: "red",
    },
  });

  return (
    <View style={styles.backgroundStyle}>
      {searching && <ActivityIndicator size={35} color="red" animating={true} style={{ marginHorizontal: 15 }} />}
      {!searching && <Feather name="search" style={[styles.iconStyle, { marginHorizontal: 15 }]} />}
      <TextInput
        value={term}
        // onChangeText={(value) => onTermChange(value)}
        // onEndEditing={() => onTermSubmitted()}
        onFocus={() => {
          setElevationValue(3);
          onTermChange("");
        }}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        onBlur={() => {
          setElevationValue(1);
        }}
        placeholder="Search"
        style={[styles.inputStyle]}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
