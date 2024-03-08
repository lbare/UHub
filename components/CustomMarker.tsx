import { View, Image, Text, ImageSourcePropType } from "react-native";
import Coordinates from "../models/Coordinates";
import { FoodVendor } from "../models/FoodVendor";
import { Callout, Marker } from "react-native-maps";
import React from "react";

interface CustomMarkerProps {
  keyp: number;
  name: string;
  coordinate: Coordinates;
  image: ImageSourcePropType;
  vendor: FoodVendor;
  onPressCustom: () => void;
  zoomLevel: number;
}
export const CustomMarker: React.FC<CustomMarkerProps> = ({
  keyp,
  name,
  coordinate,
  image,
  vendor,
  zoomLevel,
  onPressCustom,
}) => (
  <Marker
    title={name}
    coordinate={coordinate}
    onPress={() => onPressCustom()}
    flat={false}
    stopPropagation={true}
    key={keyp}
  >
    <View className="flex justify-start items-center w-12 h-12">
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
        }}
      />
      {zoomLevel > 14.8 ? (
        <Text className="text-gray-200 text-sm">{name}</Text>
      ) : null}
    </View>
  </Marker>
);
