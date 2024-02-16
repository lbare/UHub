import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigation/HomeNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <HomeNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
