import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";
import DataFetcher from "../services/DataFetcher";
import { Building } from "../models/Building";
import { Text, TextInput, Image, ImageSourcePropType } from "react-native";
import MenuSearch from "../services/MenuSearch";

const _mapView = React.createRef<MapView>();

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.02,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const dataFetcher = new DataFetcher();
const menuSearch = new MenuSearch();

interface CustomMarkerProps {
  keyp: number;
  name: string;
  coordinate: Coordinates;
  image: ImageSourcePropType;
  vendor: FoodVendor;
  onPressCustom: () => void;
  zoomLevel: number;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
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
    <View className="flex justify-start items-center h-12">
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
        }}
      />
      {zoomLevel > 14.8 ? (
        <Text className="text-gray-600 text-sm">{name}</Text>
      ) : null}
    </View>
  </Marker>
);

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState<FoodVendor | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    dataFetcher.getAllBuildings(setBuildings);
    onZoomChange(UVicRegion);
  }, []);

  const calculateZoomLevel = (latitudeDelta: number) => {
    const maxLatitude = 180;
    const zoomLevel = Math.round(
      Math.log(maxLatitude / latitudeDelta) / Math.LN2
    );
    return zoomLevel;
  };

  const onZoomChange = (newRegion: Coordinates) => {
    const newZoomLevel = calculateZoomLevel(newRegion.latitudeDelta);
    setZoomLevel(newZoomLevel);
  };

  const onMarkerPress = (vendor: FoodVendor) => {
    setSelectedLocation(vendor.location);
    setSelectedVendor(vendor);
    const adjustedLatitude =
      vendor.location.latitude - region.latitudeDelta * 0.105;
    const newRegion = {
      latitude: adjustedLatitude,
      longitude: vendor.location.longitude,
      latitudeDelta: region.latitudeDelta / 3,
      longitudeDelta: region.longitudeDelta / 3,
    };

    if (_mapView.current) {
      _mapView.current.animateToRegion(newRegion, 200);
    }
    //setRegion(newRegion);
    setModalVisible(true);
  };

  const onModalHide = () => {
    if (selectedLocation) {
      const new_region = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: selectedLocation.latitudeDelta * 5,
        longitudeDelta: selectedLocation.longitudeDelta * 5,
      };

      if (_mapView.current) {
        _mapView.current.animateToRegion(new_region, 200);
      }
    }
    setModalVisible(false);
  };

  return (
    <View className="bg-white flex h-full w-full justify-center items-center">
      {/* <TextInput
        placeholder="Search..."
        onChangeText={(text) => {menuSearch.searchAllMenuItems(text);}}
        style={{
          width: "80%",
          height: 40,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      /> */}
      <MapView
        ref={_mapView}
        className="flex justify-center items-center w-full h-full"
        initialRegion={UVicRegion}
        region={region}
        provider= {PROVIDER_GOOGLE}
        maxZoomLevel={20}
        minZoomLevel={15}
        mapType="standard"
        userInterfaceStyle="light"
        showsUserLocation={true}
        onRegionChange={onZoomChange}
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
        {buildings.map((building) =>
          building.vendors.map((vendor, index) => (
            <React.Fragment key={index}>
              <CustomMarker
                keyp={index}
                name={vendor.name}
                coordinate={vendor.location}
                image={require("../assets/3448609.png")}
                vendor={vendor}
                onPressCustom={() => onMarkerPress(vendor)}
                zoomLevel={zoomLevel}
              />
            </React.Fragment>
          ))
        )}
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
