import React, { useState } from "react";
import { Button, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import { foodVendorExample } from "../models/FoodVendor";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.015,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [key, setKey] = useState<number>(Math.random());

  return (
    <View className="bg-white h-full w-full justify-center items-center">
      <MapView
        className="flex justify-center items-center w-full h-full"
        initialRegion={UVicRegion}
        key={key}
        region={region}
        provider="google"
        maxZoomLevel={20}
        minZoomLevel={14}
        mapType="standard"
        userInterfaceStyle="light"
        showsUserLocation={true}
        showsBuildings={false}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={foodVendorExample.location}
          title={foodVendorExample.name}
          description={foodVendorExample.description}
          flat={false}
        />
        {/* <Button
          title="Reset"
          onPress={() => {
            console.log("Resetting map");
            setRegion(UVicRegion);
            setKey(Math.random());
          }}
        /> */}
      </MapView>
    </View>
  );
};

export default HomeMap;
