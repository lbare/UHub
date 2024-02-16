import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import { foodVendorExamples } from "../models/FoodVendor";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.015,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState<FoodVendor | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onMarkerPress = (vendor: FoodVendor) => {
    setSelectedLocation(vendor.location);
    setSelectedVendor(vendor);
    const adjustedLatitude =
      vendor.location.latitude - region.latitudeDelta * 0.105;
    setRegion({
      latitude: adjustedLatitude,
      longitude: vendor.location.longitude,
      latitudeDelta: region.latitudeDelta / 3,
      longitudeDelta: region.longitudeDelta / 3,
    });
    setModalVisible(true);
  };

  const onModalHide = () => {
    if (selectedLocation) {
      setRegion({
        ...UVicRegion,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
    setModalVisible(false);
  };

  return (
    <View className="bg-white flex h-full w-full justify-center items-center">
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
        onPress={onModalHide}
        customMapStyle={[
          {
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.neighborhood",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ]}
      >
        {foodVendorExamples.map((vendor) => (
          <Marker
            key={vendor.name}
            coordinate={vendor.location}
            title={vendor.name}
            description={vendor.description}
            flat={false}
            stopPropagation={true}
            onPress={() => onMarkerPress(vendor)}
          />
        ))}
      </MapView>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onModalHide={onModalHide}
        vendor={selectedVendor!}
      />
    </View>
  );
};

export default HomeMap;
