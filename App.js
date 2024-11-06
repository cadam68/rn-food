import React, { useState } from "react";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";

const App = () => {
  const [splash, setSplash] = useState(true);

  if (splash == undefined) return;

  return (
    <>
      {splash ? (
        <SplashScreen
          onSubmit={() => {
            setSplash(false);
          }}
        />
      ) : (
        <HomeScreen />
      )}
    </>
  );
};

export default App;
