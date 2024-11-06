import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";
import { GUI, STYLES } from "../hooks/useTools";
import useResults from "../hooks/useResults";
import useLocation from "../hooks/useLocation";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [radius, setRadius] = useState(2000);

  const [location] = useLocation(() => {
    Alert.alert("Sorry, we need location permissions to allow you to search for a business !");
  });
  const [searchApi, results, errorMessage] = useResults(setSearching, location, radius);

  const filterResultsByPrice = price => {
    // price === '€' || '€€' ...

    return results
      .map(e => {
        // console.log(e);
        return {
          id: e.id,
          name: e.name,
          price: e.price == undefined ? "€€" : e.price,
          phone: e.display_phone,
          address: e.location.display_address.join(),
          coordinates: e.coordinates,
          image_url: e.image_url,
          rating: e.rating,
          review_count: e.review_count,
          distance: e.distance,
        };
      })
      .filter(e => {
        return e.price.length == price.length;
      })
      .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));
  };

  return (
    <>
      <View style={{ flex: 1, borderColor: "red", borderBottomWidth: 1 }}>
        <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)} searching={searching} />
        <Slider value={radius} onValueChange={setRadius} minimumValue={1000} maximumValue={20000} step={1000} thumbTintColor={"red"} onSlidingComplete={() => searchApi(term)} />
        {errorMessage && <Text>{errorMessage}</Text>}
        <Text style={{ alignSelf: "center", marginBottom: 5 }}>
          We have found {results?.length} results in a range of {radius / 1000} km
        </Text>
        {false && (
          <Text>
            Location: latitude={location?.latitude}, longitude={location?.longitude}
          </Text>
        )}
        {true && results?.length > 0 && (
          <ScrollView>
            <ResultsList title="Cost Effective" values={filterResultsByPrice("€")} />
            <GUI.Separator />
            <ResultsList title="Bit Pricier" values={filterResultsByPrice("€€")} />
            <GUI.Separator />
            <ResultsList title="Big Spender" values={[...filterResultsByPrice("€€€"), ...filterResultsByPrice("€€€€")]} />
            {false && (
              <>
                <GUI.Separator />
                <ResultsList title="Huge Spender" values={filterResultsByPrice("€€€€")} />
              </>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
