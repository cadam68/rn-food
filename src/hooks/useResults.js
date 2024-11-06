import { useEffect, useState } from "react";
import { Alert, Vibration } from "react-native";
import yelp from "../api/yelp";

export default (setSearching, location, radius) => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.latitude != undefined) searchApi("");
  }, [location]);

  const searchApi = async searchTerm => {
    // console.log(`searchApi('${searchTerm}', ${radius})`);
    // if(location!=undefined) console.log(`latitude=${location.latitude}, longitude=${location.longitude}`);
    setSearching(true);

    if (true) {
      try {
        const response = await yelp.get("/search", {
          params: {
            limit: 50,
            term: searchTerm,
            latitude: location.latitude,
            longitude: location.longitude,
            radius: radius,
            // location: 'paris'
          },
        });
        setResults(response.data.businesses);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e.message);
        Alert.alert("Oups", "Something went wrong, please try again later ...", [{ text: "OK", onPress: () => {} }], { cancelable: false });
      }
    }
    Vibration.vibrate(50);
    setSearching(false);
  };

  return [searchApi, results, errorMessage];
};
