import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";
import { Building } from "./models/Building";
import { getDocs, doc, collection } from "firebase/firestore";
import { BuildingContext } from "./contexts/BuildingContext";
import { db } from "./services/firebase";

export default function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const buildingsColRef = collection(db, "buildings");
      const querySnapshot = await getDocs(buildingsColRef);

      const buildingsArray: Building[] = [];

      querySnapshot.forEach((doc) => {
        const buildingData = doc.data() as Building;
        buildingsArray.push(buildingData);
      });

      setBuildings(buildingsArray);
      console.log("Buildings fetched:", buildingsArray);
    };

    fetchBuildings();
  }, []);

  return (
    <BuildingContext.Provider value={buildings}>
      <NavigationContainer>
        <HomeNavigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </BuildingContext.Provider>
  );
}
