import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";
import { Building } from "./models/Building";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import { BuildingContext } from "./contexts/BuildingContext";
import { db } from "./services/firebase";
import loadAssets from "./hooks/loadAssets";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isFinalReady, setIsFinalReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadAssets();

        // Fetch the last updated timestamp from Firestore
        const metadataDoc = await getDoc(doc(db, "Metadata", "lastUpdated"));
        const serverTimestamp = metadataDoc.data()?.timestamp;
        const serverLastUpdated = serverTimestamp
          ? serverTimestamp.seconds * 1000 +
            serverTimestamp.nanoseconds / 1000000
          : null;
        console.log(
          "Server last updated:",
          serverLastUpdated
            ? new Date(serverLastUpdated).toLocaleString()
            : "N/A"
        );

        const localData = await AsyncStorage.getItem("buildings_cache");
        const localCache = localData ? JSON.parse(localData) : {};
        const localLastUpdated = localCache.lastUpdated || null;
        console.log(
          "Local last updated:",
          localLastUpdated ? new Date(localLastUpdated).toLocaleString() : "N/A"
        );

        // Check if the Firestore data is newer than the local cache
        if (
          !localData ||
          !localLastUpdated ||
          (serverLastUpdated && serverLastUpdated > localLastUpdated)
        ) {
          // Data in Firestore is newer, fetch and cache it
          const querySnapshot = await getDocs(collection(db, "Building:V3"));
          const buildingsArray = querySnapshot.docs.map(
            (doc) => doc.data() as Building
          );
          setBuildings(buildingsArray);
          await AsyncStorage.setItem(
            "buildings_cache",
            JSON.stringify({
              data: buildingsArray,
              lastUpdated: serverLastUpdated,
            })
          );
          console.log("Buildings updated from Firestore");
        } else {
          // Load data from the local cache
          setBuildings(JSON.parse(localData).data);
          console.log("Buildings loaded from cache");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!isReady)
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

  return (
    <BuildingContext.Provider value={buildings}>
      <NavigationContainer>
        <HomeNavigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </BuildingContext.Provider>
  );
}
