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
   isSelected: boolean;
   zIndex: number;
   onPressCustom: () => void;
   zoomLevel: number;
 }

 const CustomMarker: React.FC<CustomMarkerProps> = ({
   keyp,
   name,
   coordinate,
   image,
   zoomLevel,
   isSelected,
   onPressCustom,
 }) => (
   <Marker
    title={name}
    coordinate={coordinate}
    onPress={() => onPressCustom()}
     flat={false}
     stopPropagation={true}
     key={keyp}
     zIndex={isSelected ? 1 : 0}
   >
     <View className="flex justify-start items-center w-full h-full">
       <Image
         source={image}
         resizeMode="contain"
         style={{
           width: isSelected ? 40 : 30,
           height: isSelected ? 40 : 30,
         }}
       />

       {zoomLevel > 14.8 ? (
         <Text className="text-gray-200 text-sm">{name}</Text>
       ) : null}
     </View>
     <Callout tooltip={true}>
       <Text></Text>
     </Callout>
   </Marker>
 );

 export default CustomMarker;