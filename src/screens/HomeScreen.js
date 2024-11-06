import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import ResultsShowScreen from "./ResultsShowScreen";
import FavoritesScreen from "./FavoritesScreen";
import HeaderRight from "./../components/HeaderRight";

const Stack = createNativeStackNavigator();

// const HomeScreen = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Search"
//         screenOptions={({ navigation }) => ({
//           title: "Business Search",
//           headerStyle: { backgroundColor: "#f4511e" },
//           headerTintColor: "#ffffff",
//           headerTitleStyle: { textAlign: "center" },
//           headerRight: () => <HeaderRight />,
//         })}>
//         <Stack.Screen name="Search" component={SearchScreen} />
//         <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
//         <Stack.Screen name="Favorites" component={FavoritesScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
          title: "Business Search",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { textAlign: "center" },
          headerRight: () => <HeaderRight />,
        }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ResultsShow" component={ResultsShowScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
