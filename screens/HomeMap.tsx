import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageSourcePropType,
  Text,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";
import { BuildingContext } from "../contexts/BuildingContext";
import { useContext } from "react";
import MenuSearch from "../services/MenuSearch";
import DataFetcher from "../services/DataFetcher";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { SearchBar } from "../components/SearchBar";
import { MenuItem } from "../models/Menu";
import { CustomMarker } from "../components/CustomMarker";

const _mapView = React.createRef<MapView>();

const UVicRegion: Coordinates = {
  // latitude: 48.463440294565316,
  // latitudeDelta: 0.02,
  // longitude: -123.3121273188308,
  // longitudeDelta: 0.01,
  latitude: 48.46477193608986,
  latitudeDelta: 0.002,
  longitude: -123.30808666750896,
  longitudeDelta: 0.001,
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

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState<FoodVendor | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const buildings = useContext(BuildingContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Map<MenuItem, FoodVendor>>(
    new Map()
  );
  const searchInputRef = useRef<TextInput>(null);
  const [markerSize, setMarkerSize] = useState(100);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    // dataFetcher.getAllBuildings(setBuildings);
    onZoomChange(UVicRegion);
  }, []);

  useEffect(() => {
    if (searchInput !== "") {
      const results = menuSearch.searchAllMenuItems(searchInput);
      setSearchResults(results);
    } else {
      setSearchResults(new Map());
    }
  }, [searchInput]);

  const calculateZoomLevel = (latitudeDelta: number) => {
    const maxLatitude = 180;
    const zoomLevel = Math.round(
      Math.log(maxLatitude / latitudeDelta) / Math.LN2
    );
    // setMarkerSize(Math.max(20, zoomLevel * 5));
    console.log("Marker Size", markerSize);

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

  useEffect(() => {
    console.log(zoomLevel);
  }, [zoomLevel]);

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

  var mapStyles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
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
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  useEffect(() => {
    console.log(modalVisible);
  }, [modalVisible]);

  if (searchOpen)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#383838",
        }}
      >
        {!modalVisible && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              width: "100%",
              height: 150,
              borderRadius: 20,
            }}
          >
            <SearchBar
              shadowStyle={{
                shadowColor: "#000000",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
              clearResults={() => setSearchResults(new Map())}
              ref={searchInputRef}
              searchInput={searchInput}
              selected={searchOpen}
              setSelected={setSearchOpen}
              setSearchInput={setSearchInput}
              onBlur={() => setSearchOpen(false)}
            />
          </View>
        )}
        <ScrollView
          style={{
            marginTop: 150,
          }}
          contentContainerStyle={{
            alignItems: "flex-start",
            width: "100%",
            backgroundColor: "#383838",
            borderRadius: 20,
            height: searchResults.size === 0 ? "100%" : undefined,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {Array.from(searchResults.entries()).map(
            ([menuItem, foodVendor], index) => (
              <View
                key={index}
                className="flex-row px-6 py-3 justify-between items-center"
                style={{
                  backgroundColor: index % 2 == 0 ? "#404040" : "#383838",
                  width: "100%",
                }}
              >
                <View className="flex-row">
                  <View className="rounded-full border-2 w-12 h-12 bg-neutral-600 border-gray-200 justify-center items-center">
                    <Text className="text-lg font-medium text-gray-200">
                      SUB
                    </Text>
                  </View>
                  <View className="w-64 pl-4 justify-start">
                    <Text className="text-xl font-medium text-gray-200">
                      {foodVendor.name}
                    </Text>
                    {menuItem.name && (
                      <Text className="text-sm text-gray-400">
                        {menuItem.name}
                      </Text>
                    )}
                    {menuItem.tags && menuItem.tags.length > 0 && (
                      <Text className="text-xs font-semibold text-gray-400 mr-2 inline-block">
                        {menuItem.tags.join(", ")}
                      </Text>
                    )}
                  </View>
                </View>
                <View className="justify-end items-end">
                  <Text className="text-lg font-semibold text-gray-400">
                    ${menuItem.price}
                  </Text>
                </View>
              </View>
            )
          )}
        </ScrollView>
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {!modalVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setSearchOpen(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              backgroundColor: "transparent",
            }}
          >
            <View
              className="flex w-full items-center justify-center mt-16"
              style={{
                shadowColor: "#000000",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.6,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <View className="flex flex-row w-5/6 h-16 bg-blue-400 shadow-xl rounded-2xl">
                <View className="flex w-16 h-full justify-center items-center">
                  <MagnifyingGlass size={24} color="#383838" weight="bold" />
                </View>
                <View className="h-full w-3/5 justify-center items-start">
                  <Text className="font-semiBold text-2xl text-neutral-800">
                    Search
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        <MapView
          ref={_mapView}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          initialRegion={UVicRegion}
          region={region}
          provider={PROVIDER_GOOGLE}
          maxZoomLevel={20}
          minZoomLevel={15}
          mapType="standard"
          showsUserLocation={true}
          onRegionChange={onZoomChange}
          onPress={onModalHide}
          customMapStyle={mapStyles}
        >
          {buildings &&
            buildings.map((building) =>
              building.vendors.map((vendor, index) => (
                <React.Fragment key={index}>
                  <CustomMarker
                    keyp={index}
                    name={vendor.name}
                    coordinate={vendor.location}
                    image={require("../assets/marker.png")}
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
