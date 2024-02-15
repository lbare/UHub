import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";

const HomeMap: React.FC = () => {
  return (
    <View className="bg-white h-full w-full justify-center items-center">
      <MapView className="w-full h-full" />
    </View>
  );
};

export default HomeMap;
