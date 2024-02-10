import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-white h-full w-full justify-center items-center">
      <Text className="text-black font-black text-4xl">UHub</Text>
      <StatusBar style="auto" />
    </View>
  );
}
