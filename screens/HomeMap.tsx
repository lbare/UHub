import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
  Image,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginPage from "../services/Firebase/login"
import FirebaseAuthManager from "../services/Firebase/firebase-auth"
import MapView, {
  Details,
  LatLng,
  PROVIDER_GOOGLE,
  Polygon,
} from "react-native-maps";
import Coordinates from "../models/Coordinates";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";
import { BuildingContext } from "../contexts/BuildingContext";
import { useContext } from "react";
import MenuSearch from "../services/MenuSearch";
import { MagnifyingGlass, ArrowUpRight } from "phosphor-react-native";
import { SearchBar } from "../components/SearchBar";
import { MenuItem, MenuItemTag } from "../models/Menu";
import CustomMarker from "../components/CustomMarker";
import TagFilterButton from "../components/TagFilterButton";
import buildingPolygons from "../services/buildingPolygons";
import buildingPolygonsSimple from "../services/buildingPolygonsSimple";
import BuildingFilterDropdown from "../components/BuildingFilterDropdown";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.02,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

interface UserPopupProps {
  isVisible: boolean;
  email: string | null;
  onLogout: () => void;
  onSignIn: () => void;
  onClose: () => void;
}
const UserPopup: React.FC<UserPopupProps> = ({
  isVisible,
  email,
  onLogout,
  onSignIn,
  onClose,
}) => (
  <Modal visible={isVisible} transparent={true} animationType="slide">
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {email ? (
          <>
            <Text style={styles.modalText}>Logged in as {email}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onLogout}
            >
              <Text style={styles.textStyle}>Log Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.modalText}>Not logged in</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onSignIn} 
            >
              <Text style={styles.textStyle}>Sign In</Text>
            </Pressable>
          </>
        )}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onClose}
        >
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
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
  const [openedModalFromSearch, setOpenedModalFromSearch] =
    useState<boolean>(false);
  const buildings = useContext(BuildingContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Map<MenuItem, FoodVendor>>(
    new Map()
  );
  const [buildingFilters, setBuildingFilters] = useState<any[]>([]);
  const [openVendorsFilter, setOpenVendorsFilter] = useState<boolean>(false);

  const searchInputRef = useRef<TextInput>(null);
  const _mapView = React.createRef<MapView>();

  const menuSearch = new MenuSearch(buildings);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false);

  const authManager = new FirebaseAuthManager((user) => {
    if (user) {
      setUserEmail(user.email); 
    } else {
      setUserEmail(null);
    }
  });

  const handleLogout = () => {
    authManager.signOut().then(() => {
      Alert.alert('Logged out successfully');
      setPopupVisible(false); 
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  };
  const handleSignIn = (): void => {
    console.log('Navigate to Sign In screen or open Sign In modal');
    // Implement navigation or modal opening logic here
    setIsLoginModalVisible(true); 
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    onSearchChange();
  }, [searchInput, buildingFilters, openVendorsFilter]);

  useEffect(() => {
    // dataFetcher.getAllBuildings(setBuildings);
    onZoomChange(UVicRegion);
  }, []);

  const onSearchChange = () => {
    menuSearch.setBuildingFilters(buildingFilters);
    if (searchInput !== "") {
      const results = menuSearch.searchAllMenuItems(
        searchInput,
        openVendorsFilter
      );
      setSearchResults(results);
    } else {
      setSearchResults(new Map());
    }
  };

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

  const zoomToBuilding = (building: string) => {
    console.log("Zooming to building: ", building);

    const buildingData = buildings.find((b) => b.code === building);
    console.log("Building Data: ", buildingData);

    if (buildingData) {
      const newRegion = {
        latitude: buildingData.location.latitude,
        longitude: buildingData.location.longitude,
        latitudeDelta: region.latitudeDelta / 8,
        longitudeDelta: region.longitudeDelta / 8,
      };
      if (_mapView.current) {
        _mapView.current.animateToRegion(newRegion, 200);
      }
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

  const onModalHide = (gotoSearch: boolean) => {
    //TODO: this logic doesn't really make sense, it should be refactored
    // I wanted to preserve the user's last region before tapping on a marker
    // and then return to that region after the modal is closed
    // but it didn't look very good seemed jumpy
    // so I just set it back to zooming out on the vendor they were looking at
    if (selectedVendor) {
      const adjustedlatitude = selectedVendor.location.latitude;
      const newRegion = {
        latitude: adjustedlatitude,
        longitude: selectedVendor.location.longitude,
        latitudeDelta: region.latitudeDelta / 4,
        longitudeDelta: region.longitudeDelta / 4,
      };
      if (_mapView.current) {
        _mapView.current.animateToRegion(newRegion, 200);
      }
    }

    unselectMarker();
    setModalVisible(false);

    if (gotoSearch) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
      setSearchInput("");
    }
    setOpenedModalFromSearch(false);
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
          customMapStyle={mapStyles}
        >
          {zoomLevel < 15
            ? buildingPolygonsSimple &&
              buildingPolygonsSimple.map(
                (building, index) =>
                  building && (
                    <Polygon
                      key={index}
                      tappable={true}
                      onPress={() => zoomToBuilding(building.name)}
                      coordinates={building.coordinates.map((coord) => ({
                        latitude: coord.latitude,
                        longitude: coord.longitude,
                      }))}
                      strokeColor="#EB6931"
                      strokeWidth={Math.max(zoomLevel - 12, 2)}
                      fillColor={zoomLevel < 15 ? "#EB6931AA" : "#EB69312E"}
                    />
                  )
              )
            : buildingPolygons &&
              buildingPolygons.map(
                (building, index) =>
                  building && (
                    <Polygon
                      key={index}
                      tappable={true}
                      onPress={() => zoomToBuilding(building.name)}
                      coordinates={building.coordinates.map((coord) => ({
                        latitude: coord.latitude,
                        longitude: coord.longitude,
                      }))}
                      strokeColor="#EB6931"
                      strokeWidth={zoomLevel - 12}
                      fillColor={zoomLevel < 15 ? "#EB6931AA" : "#EB69312E"}
                    />
                  )
              )}
          {zoomLevel > 14 &&
            buildings &&
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

          <View style={{ position: 'absolute', bottom: 25, left: 10 }}>
            <TouchableOpacity onPress={() => setPopupVisible(true)}>
              <MaterialCommunityIcons name="account-circle" size={40} color="#154058" />
            </TouchableOpacity>
          </View>

          <UserPopup
            isVisible={popupVisible}
            email={userEmail}
            onLogout={handleLogout}
            onSignIn={handleSignIn} 
            onClose={() => setPopupVisible(false)}
          />
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          changeVendor={onMarkerPress}
          onModalHide={onModalHide}
          openedModalFromSearch={openedModalFromSearch}
          vendor={selectedVendor!}
          building={buildings.find((b) => b.vendors.includes(selectedVendor!))!}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: searchOpen ? 2 : -1, 
          opacity: searchOpen ? 1 : 0, 
          height: searchOpen ? "100%" : 0, 
          backgroundColor: "#1D1D1D",
        }}
      >
        {!modalVisible && searchOpen && (
          <View
            style={{
              width: "100%",
              height: 235,
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 10,
                marginTop: 15,
              }}
            >
              <TagFilterButton
                text="Vegan"
                tag={MenuItemTag.Vegan}
                menuSearchObject={menuSearch}
                onUpdate={onSearchChange}
              />
              <TagFilterButton
                text="Dairy Free"
                tag={MenuItemTag.DairyFree}
                menuSearchObject={menuSearch}
                onUpdate={onSearchChange}
              />
              <TagFilterButton
                text="Gluten Free"
                tag={MenuItemTag.GlutenFree}
                menuSearchObject={menuSearch}
                onUpdate={onSearchChange}
              />
              <TagFilterButton
                text="GF Option"
                tag={MenuItemTag.GlutenFreeOption}
                menuSearchObject={menuSearch}
                onUpdate={onSearchChange}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 15,
                marginTop: 0,
              }}
            >
              <Pressable
                // Open Now filter button
                onPress={() => {
                  setOpenVendorsFilter(!openVendorsFilter);
                }}
                style={{
                  backgroundColor: openVendorsFilter
                    ? "#0a912eff"
                    : "#00000000",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderColor: "#EDEDED",
                  borderWidth: 2,
                  borderRadius: 30,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "#EDEDED", textAlign: "center" }}>
                  Open Now
                </Text>
              </Pressable>
              <View
                style={{
                  flex: 1,
                }}
              >
                <BuildingFilterDropdown
                  buildings={buildings}
                  style={{ marginLeft: 10 }}
                  selectedItems={buildingFilters}
                  onUpdate={(newList: any) => {
                    setBuildingFilters(newList);
                  }}
                />
              </View>
            </View>
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
                  setOpenedModalFromSearch(true);
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
                    <Text className="text-lg font-medium text-neutral-200">
                      {menuItem.name}
                    </Text>
                    {menuItem.name && (
                      <Text className="text-base text-neutral-400">
                        {foodVendor.name}
                      </Text>
                    )}
                    {menuItem.tags && menuItem.tags.length > 0 && (
                      <Text className="text-xs font-semibold text-neutral-400 mr-2 inline-block">
                        {menuItem.tags.join(", ")}
                      </Text>
                    )}
                  </View>
                  <View className="w-12 h-12 justify-center items-start">
                    <ArrowUpRight size={20} color="#EB6931" />
                  </View>
                </View>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
      {
        isLoginModalVisible && (
          <LoginPage
            modalVisible={isLoginModalVisible}
            setModalVisible={setIsLoginModalVisible}
          />
        )
      }
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
            <View
              className="flex flex-row w-5/6 h-16 shadow-xl rounded-2xl items-center justify-start"
              style={{
                backgroundColor: "#EDEDED",
              }}
            >
              <View className="flex w-16 h-full justify-center items-center">
                <MagnifyingGlass size={24} color="#154058" weight="bold" />
              </View>
              <View className="h-full w-3/5 justify-center items-start">
                <Text
                  className="font-semiBold text-2xl"
                  style={{
                    color: "#154058",
                  }}
                >
                  Search
                </Text>
              </View>
              <View className="h-full w-16 justify-center items-center">
                <Image
                  source={require("../assets/logo.png")}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  resizeMode="center"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 2,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default HomeMap;
