import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";
import { Building } from "./models/Building";
import { getDocs, collection } from "firebase/firestore";
import { BuildingContext } from "./contexts/BuildingContext";
import { db } from "./services/firebase";
import loadAssets from "./hooks/loadAssets";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isReady, setIsReady] = useState(false);

  const fetchData = async () => {
    try {
      await loadAssets();
      const cache = await AsyncStorage.getItem("buildings_cache");
      const now = new Date();

      if (cache) {
        const { data, timestamp } = JSON.parse(cache);
        const cacheAge = now.getTime() - timestamp;

        if (cacheAge < 86400000) {
          // 24 hours in milliseconds
          setBuildings(data);
          console.log("Using cached data");
        } else {
          await updateDataFromFirebase();
        }
      } else {
        await updateDataFromFirebase();
      }
    } catch (error) {
      console.error("Error fetching buildings:", error);
    } finally {
      setIsReady(true);
    }
  };

  const updateDataFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "Building:V2"));
    const buildingsArray = querySnapshot.docs.map(
      (doc) => doc.data() as Building
    );

    setBuildings(buildingsArray);
    await AsyncStorage.setItem(
      "buildings_cache",
      JSON.stringify({ data: buildingsArray, timestamp: new Date().getTime() })
    );
    console.log("Using new data");
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isReady) {
    return (
      <Image
        source={require("./assets/splash.png")}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    );
  } else
    return (
      <BuildingContext.Provider value={buildings}>
        <NavigationContainer>
          <HomeNavigation />
          <StatusBar style="light" />
        </NavigationContainer>
      </BuildingContext.Provider>
    );
}
