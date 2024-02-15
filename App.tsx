import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "./src/firebase";

export default function App() {

  async function create() {
    try {
      const docRef =  await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  create();
  return (
    <NavigationContainer>
      <HomeNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
