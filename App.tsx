import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "./src/firebase";
import { useEffect } from "react";
import data from "./src/data.json"; 

export default function App() {
  useEffect(() => {
    async function create() {
      try {
        for (const vendorKey in data) {
          const vendor = data[vendorKey];
          const docRef = await addDoc (collection(db, "FoodVendor"), vendor)
        console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    create();
  }, []); 
  return (
    <NavigationContainer>
      <HomeNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
