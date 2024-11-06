import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default noPermissionCallback => {
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(() => {
    checkPermissions();
  }, []);

  useEffect(() => {
    if (hasPermission) refreshLocation();
  }, [hasPermission]);

  const checkPermissions = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log(`status Location.requestForegroundPermissionsAsync = ${status}`)
      setHasPermission(status == "granted");
      status !== "granted" && noPermissionCallback ? noPermissionCallback() : null;
    })();
  };

  const refreshLocation = () => {
    (async () => {
      if (hasPermission) {
        // SOL1 :
        let subscription = await Location.watchPositionAsync({ enableHighAccuracy: true, accuracy: Location.Accuracy.BestForNavigation }, position => {
          subscription.remove();
          setLocation(position.coords);
        });
        /**/

        // SOL2 : work-around error 'Location provider is unavailable. Make sure that location services are enabled'
        /*
            let position;
            let locationSuccess = false;
            while (!locationSuccess) {
                try {
                    position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                    locationSuccess = true;
                } catch (ex) {}
            }
            // console.log("Location",position)
            setLocation(position.coords);
            /* */
      }
    })();
  };

  return [location, refreshLocation];
};
