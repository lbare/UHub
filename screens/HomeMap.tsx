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
import MapView, { Details, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Coordinates from "../models/Coordinates";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";
import { BuildingContext } from "../contexts/BuildingContext";
import { useContext } from "react";
import MenuSearch from "../services/MenuSearch";
import DataFetcher from "../services/DataFetcher";
import { MagnifyingGlass, ArrowUpRight } from "phosphor-react-native";
import { SearchBar } from "../components/SearchBar";
import { MenuItem } from "../models/Menu";
import CustomMarker from "../components/CustomMarker";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.02,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const menuSearch = new MenuSearch();

const HomeMap: React.FC = () => {
  const [region, setRegion] = useState<Coordinates>(UVicRegion);
  const [userLastRegion, setUserLastRegion] = useState<Coordinates>(UVicRegion);
  const [userLastRegionBeforeTap, setUserLastRegionBeforeTap] =
    useState<Coordinates>(UVicRegion);
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
  const _mapView = React.createRef<MapView>();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchInput !== "") {
      const results = menuSearch.searchAllMenuItems(searchInput);
      setSearchResults(results);
    } else {
      setSearchResults(new Map());
    }
  }, [searchInput]);

  useEffect(() => {
    // dataFetcher.getAllBuildings(setBuildings);
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

  const onZoomChangeComplete = (newRegion: Coordinates, isGesture: Details) => {
    if (isGesture) {
      isGesture && setUserLastRegion(newRegion);
    }
  };

  const onMarkerPress = (vendor: FoodVendor) => {
    setSelectedLocation(vendor.location);
    setSelectedVendor(vendor);
    setUserLastRegionBeforeTap(userLastRegion);

    const adjustedlatitude = vendor.location.latitude - 0.00083;
    const newRegion = {
      latitude: adjustedlatitude,
      longitude: vendor.location.longitude,
      latitudeDelta: region.latitudeDelta / 8,
      longitudeDelta: region.longitudeDelta / 8,
    };

    if (_mapView.current) {
      _mapView.current.animateToRegion(newRegion, 200);
    }
    setModalVisible(true);
  };

  const onModalHide = () => {
    if (selectedLocation) {
      if (_mapView.current) {
        _mapView.current.animateToRegion(userLastRegionBeforeTap, 200);
      }
    }
    unselectMarker();
    setModalVisible(false);
  };

  const unselectMarker = () => {
    setSelectedLocation(null);
    setSelectedVendor(null);
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

  return (
    <View className="flex-1">
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
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
          onRegionChangeComplete={onZoomChangeComplete}
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
                    isSelected={vendor.name === selectedVendor?.name}
                    zIndex={index}
                    image={require("../assets/marker.png")}
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
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: searchOpen ? 2 : -1, // Control layering based on searchOpen
          opacity: searchOpen ? 1 : 0, // Control visibility based on searchOpen
          height: searchOpen ? "100%" : 0, // Prevents interaction when not visiblesd
          backgroundColor: "#1D1D1D",
        }}
      >
      {!modalVisible && (
        <View
          style={{
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
          contentContainerStyle={{
            alignItems: "flex-start",
            width: "100%",
            backgroundColor: "#1D1D1D",
            borderRadius: 20,
            height: searchResults.size === 0 ? "100%" : undefined,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {Array.from(searchResults.entries()).map(
            ([menuItem, foodVendor], index) => (
              <TouchableOpacity
                key={index}
                className="flex-row px-6 py-3 justify-between items-center"
                style={{
                  backgroundColor: index % 2 == 0 ? "#282828" : "#1D1D1D",
                  width: "100%",
                }}
                onPress={() => {
                  setSearchOpen(false);
                  setSearchInput("");
                  setSearchResults(new Map());
                  onMarkerPress(foodVendor);
                }}
              >
                <View className="flex-row">
                  <View className="items-start justify-center w-16">
                    <Text className="text-lg font-semibold text-neutral-400">
                      ${menuItem.price.toFixed(2)}
                    </Text>
                  </View>

                  <View className="w-64 pl-4 justify-start">
                    <Text className="text-xl font-medium text-neutral-200">
                      {foodVendor.name}
                    </Text>
                    {menuItem.name && (
                      <Text className="text-sm text-neutral-400">
                        {menuItem.name}
                      </Text>
                    )}
                    {menuItem.tags && menuItem.tags.length > 0 && (
                      <Text className="text-xs font-semibold text-neutral-400 mr-2 inline-block">
                        {menuItem.tags.join(", ")}
                      </Text>
                    )}
                  </View>
                  <View className="w-12 h-12 justify-center items-end">
                    <ArrowUpRight size={20} color="#A3A3A3" />
                  </View>
                </View>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
      {!(searchOpen || modalVisible) && (
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
    </View>
  );
};

export default HomeMap;
