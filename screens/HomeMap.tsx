import { MagnifyingGlass } from "phosphor-react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CustomMarker from "../components/CustomMarker";
import CustomModal from "../components/Modal";
import { SearchBar } from "../components/SearchBar";
import { BuildingContext } from "../contexts/BuildingContext";
import Coordinates from "../models/Coordinates";
import { FoodVendor } from "../models/FoodVendor";
import { MenuItem } from "../models/Menu";
import MenuSearch from "../services/MenuSearch";

const _mapView = React.createRef<MapView>();

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.02,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

const menuSearch = new MenuSearch();

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
    }
  }, [searchInput]);

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
    unselectMarker();
    setModalVisible(false);
  };

  const unselectMarker = () => {
    //setSelectedLocation(null);
  }

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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
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
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
            }}
          >
            <SearchBar
              ref={searchInputRef}
              searchInput={searchInput}
              selected={searchOpen}
              setSelected={setSearchOpen}
              setSearchInput={setSearchInput}
              onBlur={() => setSearchOpen(false)}
            />
          </View>
        )}
        <View
          style={{
            marginTop: 130,
            alignItems: "flex-start",
            padding: 8,
            width: "100%",
          }}
        >
          {Array.from(searchResults.entries()).map(
            ([menuItem, foodVendor], index) => (
              <View
                key={index}
                className=""
                style={{
                  backgroundColor: index % 2 == 0 ? "#F0F0F0" : "white",
                  marginLeft: -15,
                  paddingLeft: 15,
                  marginRight: -15,
                  paddingRight: 15,
                  paddingBottom: 8,
                  paddingVertical: 8,
                  width: "100%",
                }}
              >
                <Text className="text-lg font-medium">{foodVendor.name}</Text>
                {menuItem.name && (
                  <Text className="text-sm mt-1">{menuItem.name}</Text>
                )}
                {menuItem.tags && menuItem.tags.length > 0 && (
                  <Text className="text-xs mt-1 font-semibold text-gray-500 mr-2 inline-block">
                    {menuItem.tags.join(", ")}
                  </Text>
                )}
                <Text className="text-md mt-1 font-semibold">
                  ${menuItem.price}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
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
                  <Text className="font-semiBold text-2xl">Search</Text>
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
