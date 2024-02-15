import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import { foodVendorExamples } from "../models/FoodVendor";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.015,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [markerSelected, setMarkerSelected] = useState<boolean>(false);

  return (
    <View className="bg-white h-full w-full justify-center items-center">
      <MapView
        className="flex justify-center items-center w-full h-full"
        initialRegion={UVicRegion}
        region={region}
        provider="google"
        maxZoomLevel={20}
        minZoomLevel={15}
        mapType="standard"
        userInterfaceStyle="light"
        showsUserLocation={true}
        onPress={() => {
          console.log("Centering map to UVic");
          setRegion(UVicRegion);
          if (markerSelected) setMarkerSelected(false);
        }}
      >
        {foodVendorExamples.map((vendor) => (
          <Marker
            key={vendor.name}
            coordinate={vendor.location}
            title={vendor.name}
            description={vendor.description}
            flat={false}
            stopPropagation={true}
            onPress={() => {
              console.log("Centering map to vendor:", vendor.name);
              setRegion({
                ...vendor.location,
                latitudeDelta: UVicRegion.latitudeDelta / 2,
                longitudeDelta: UVicRegion.longitudeDelta / 2,
              });
              setMarkerSelected(true);
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default HomeMap;
