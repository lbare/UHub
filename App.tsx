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

export default function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        const buildingsColRef = collection(db, "Building:V2");
        const querySnapshot = await getDocs(buildingsColRef);
        await loadAssets();

        const buildingsArray: Building[] = [];

        querySnapshot.forEach((doc) => {
          const buildingData = doc.data() as Building;
          buildingsArray.push(buildingData);
        });

        setBuildings(buildingsArray);
        console.log("Buildings fetched:", buildingsArray);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      } finally {
        setTimeout(() => {
          setIsReady(true);
        }, 2000);
      }
    };

    prepare();
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
