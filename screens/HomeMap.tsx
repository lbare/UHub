import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Pressable,
  Alert,
} from "react-native";
import MapView, { Details, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import Login from "./Login";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import Coordinates from "../models/Coordinates";
import CustomModal from "../components/Modal";
import { FoodVendor } from "../models/FoodVendor";
import { BuildingContext } from "../contexts/BuildingContext";
import { useContext } from "react";
import MenuSearch from "../services/MenuSearch";
import {
  ArrowUpRight,
  MagnifyingGlass,
  Info,
  UserCirclePlus,
  UserCircle,
  Camera,
} from "phosphor-react-native";
import { SearchBar } from "../components/SearchBar";
import { MenuItem, MenuItemTag } from "../models/Menu";
import CustomMarker from "../components/CustomMarker";
import TagFilterButton from "../components/TagFilterButton";
import buildingPolygons from "../services/buildingPolygons";
import buildingPolygonsSimple from "../services/buildingPolygonsSimple";
import BuildingFilterDropdown from "../components/BuildingFilterDropdown";
import { Building } from "../models/Building";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/HomeNavigation";
import { UserPopup } from "../components/UserPopup";
import { mapStyles } from "../services/mapStyles";
import FloatingButton from "../components/FloatingButton";
import {
  WelcomePopup,
  WelcomePopupCategories,
} from "../components/WelcomePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { versionNotes } from "../models/VersionNotes";

const UVicRegion: Coordinates = {
  latitude: 48.463440294565316,
  latitudeDelta: 0.02,
  longitude: -123.3121273188308,
  longitudeDelta: 0.01,
};

type HomeMapNavigationProp = StackNavigationProp<StackParamList, "HomeMap">;
let menuSearch: MenuSearch;

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
  const [buildings, setBuildings] = useState<Building[]>(
    useContext(BuildingContext)
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Map<MenuItem, FoodVendor>>(
    new Map()
  );
  const [buildingFilters, setBuildingFilters] = useState<any[]>([]);
  const [openVendorsFilter, setOpenVendorsFilter] = useState<boolean>(false);
  const [buildingFiltersOpen, setBuildingFiltersOpen] =
    useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loginPopupVisible, setLoginPopupVisible] = useState<boolean>(false);
  const [welcomePopupPage, setWelcomePopupPage] = useState<number>(
    WelcomePopupCategories.Hide
  );
  const [isLoginModalVisible, setIsLoginModalVisible] =
    useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showActions, setShowActions] = useState(false);

  const searchInputRef = useRef<TextInput>(null);
  const _mapView = React.createRef<MapView>();
  const buildingFilterRef = useRef(null);
  const debounceTimeoutRef = useRef<number | null>(null);

  const navigation = useNavigation<HomeMapNavigationProp>();

  const debounceDelay = 300; // milliseconds

  const authManager = new FirebaseAuthManager((user) => {
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail(null);
    }
  });

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const handleLogout = () => {
    authManager
      .signOut()
      .then(() => {
        Alert.alert("Logged out successfully");
        setLoginPopupVisible(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleSignIn = (): void => {
    setLoginPopupVisible(false);
    navigation.navigate("Login");
    console.log("Navigate to Sign In screen or open Sign In modal");
  };

  useEffect(() => {
    // dataFetcher.getAllBuildings(setBuildings);
    menuSearch = new MenuSearch(buildings); // useEffect only creates once on first render
    onZoomChange(UVicRegion);

    setWelcomePopupPage(WelcomePopupCategories.WelcomeTour);

    // Show welcome tour on app first launch
    // AsyncStorage.getItem("is_first_launch").then((value) => {
    //   if (value !== "true") {
    //     AsyncStorage.setItem("is_first_launch", "true");
    //     setWelcomePopupPage(WelcomePopupCategories.WelcomeTour);
    //     console.log("Show welcome popup on first launch");
    //   } else {
    //     // Show version notes on first launch of new version
    //     // but only if it's not the very first launch after first install
    //     AsyncStorage.getItem("last_version_notes_shown").then((value) => {
    //       const latestVersion = versionNotes[0].version;
    //       if (value !== latestVersion) {
    //         AsyncStorage.setItem("last_version_notes_shown", latestVersion);
    //         setWelcomePopupPage(WelcomePopupCategories.VersionNotes);
    //         console.log("Show version notes on first launch of new version");
    //       }
    //     });
    //   }
    // });
  }, []);

  useEffect(() => {
    if (buildingFiltersOpen) {
      (buildingFilterRef.current as any)?.openDropdown();
      console.log("Opening dropdown");
    } else {
      (buildingFilterRef.current as any)?.closeDropdown();
      console.log("Closing dropdown");
    }
  }, [buildingFiltersOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    onSearchChange();
  }, [searchInput, buildingFilters, openVendorsFilter]);

  // useEffect(() => {

  //   setSelectedItem(null);
  // }, [selectedVendor]);

  useEffect(() => {
    onSearchChange();

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (debounceTimeoutRef.current !== null) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchInput, buildingFilters, openVendorsFilter]);

  const onSearchChange = () => {
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
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
    }, debounceDelay);
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

    const adjustedlatitude = vendor.location.latitude - 0.00091;
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
      setSelectedItem(null);
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
          showsIndoorLevelPicker={false}
        >
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
                    zIndex={1000}
                    image={require("../assets/marker.png")}
                    onPressCustom={() => {
                      console.log("Marker Pressed: ", index);

                      onMarkerPress(vendor);
                    }}
                    zoomLevel={zoomLevel}
                  />
                </React.Fragment>
              ))
            )}
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
                      zIndex={-1}
                      key={index}
                      tappable={false}
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
        </MapView>
        <View className="absolute right-7 bottom-10">
          <FloatingButton
            showActions={showActions}
            toggleActions={toggleActions}
            icon={require("../assets/logo.png")}
            actions={[
              {
                icon: <Camera size={32} weight="fill" color="#154058" />,
                action: () => {
                  navigation.navigate("Upload", { vendor: "" });
                },
              },
              {
                icon: userEmail ? (
                  <UserCircle size={42} weight="fill" color="#154058" />
                ) : (
                  <UserCirclePlus size={42} weight="fill" color="#154058" />
                ),
                action: userEmail
                  ? () => setLoginPopupVisible(true)
                  : () => navigation.navigate("Login"),
              },
              {
                icon: <Info size={32} weight="fill" color="#154058" />,
                action: () => setWelcomePopupPage(WelcomePopupCategories.Menu),
              },
            ]}
          />
        </View>

        <WelcomePopup
          pageNum={welcomePopupPage}
          onClose={() => {
            setWelcomePopupPage(WelcomePopupCategories.Hide);
          }}
        />
        <UserPopup
          isVisible={loginPopupVisible}
          email={userEmail}
          onLogout={handleLogout}
          onSignIn={handleSignIn}
          onClose={() => setLoginPopupVisible(false)}
        />
        {selectedVendor && (
          <CustomModal
            selectedItem={selectedItem}
            clearSelectedItem={() => setSelectedItem(null)}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            changeVendor={onMarkerPress}
            onModalHide={onModalHide}
            openedModalFromSearch={openedModalFromSearch}
            vendor={selectedVendor!}
            setVendor={setSelectedVendor}
            building={
              buildings.find((b) => b.vendors.includes(selectedVendor!))!
            }
          />
        )}
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
        {!modalVisible && searchOpen && (
          <View
            style={{
              width: "100%",
              height: "23%",
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
              buildingFiltersOpen={buildingFiltersOpen}
              setBuildingFiltersOpen={setBuildingFiltersOpen}
              buildingFilters={buildingFilters}
              onBlur={() => setSearchOpen(false)}
            />
            <View
              style={{
                flexDirection: "row",
                // width: `${100 - (100 - 83.33) / 2}%`, // use this to have tag scroll to right edge of screen
                width: "83.33%", // 83.33% is the width set in the searchbar component. set to match
                marginLeft: `${(100 - 83.33) / 2}%`,
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <View>
                <Pressable
                  // Open Now filter button
                  onPress={() => {
                    setOpenVendorsFilter(!openVendorsFilter);
                  }}
                  style={{
                    backgroundColor: openVendorsFilter
                      ? "#154058"
                      : "#00000000",
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderColor: openVendorsFilter ? "#154058" : "#EDEDED6E",
                    borderWidth: 1,
                    borderRadius: 30,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "#EDEDED",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    Open Now
                  </Text>
                </Pressable>
              </View>
              <View className="mx-2 w-0.5 h-full bg-neutral-500" />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TagFilterButton
                  text="Vegan"
                  tags={[MenuItemTag.Vegan, MenuItemTag.VeganOption]}
                  menuSearchObject={menuSearch}
                  onUpdate={onSearchChange}
                />
                <TagFilterButton
                  text="Dairy Free"
                  tags={[MenuItemTag.DairyFree, MenuItemTag.DairyFreeOption]}
                  menuSearchObject={menuSearch}
                  onUpdate={onSearchChange}
                />
                <TagFilterButton
                  text="Gluten Free"
                  tags={[MenuItemTag.GlutenFree, MenuItemTag.GlutenFreeOption]}
                  menuSearchObject={menuSearch}
                  onUpdate={onSearchChange}
                />
                <TagFilterButton
                  text="Halal"
                  tags={[MenuItemTag.Halal]}
                  menuSearchObject={menuSearch}
                  onUpdate={onSearchChange}
                />
              </ScrollView>
            </View>
            {buildingFiltersOpen && (
              <View
                style={{
                  width: "83.33%", // 83.33% is the width set in the searchbar component. set to match
                  marginLeft: `${(100 - 83.33) / 2}%`,
                }}
              >
                <BuildingFilterDropdown
                  ref={buildingFilterRef}
                  buildings={buildings}
                  selectedItems={buildingFilters}
                  setBuildingFiltersOpen={setBuildingFiltersOpen}
                  onUpdate={(newList: any) => {
                    setBuildingFilters(newList);
                  }}
                />
              </View>
            )}
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
                  setSelectedItem(menuItem);
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
      {isLoginModalVisible && (
        <Login
          modalVisible={isLoginModalVisible}
          setModalVisible={setIsLoginModalVisible}
        />
      )}
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
              className="flex flex-row w-5/6 h-16 shadow-xl rounded-2xl items-center justify-start overflow-hidden"
              style={{
                backgroundColor: "#EDEDED",
              }}
            >
              <View className="flex w-16 h-full justify-center items-center">
                <MagnifyingGlass size={24} color="#154058" weight="bold" />
              </View>
              <View className="h-full w-3/5 justify-center items-start">
                <Text
                  className="font-semiBold text-2xl text-center"
                  style={{
                    color: "#154058",
                  }}
                >
                  Search
                </Text>
              </View>
              <View className="absolute right-10 h-full w-16 justify-center items-center rounded-2xl">
                <Image
                  source={require("../assets/search-deco.png")}
                  style={{
                    width: 364,
                    height: "100%",
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeMap;
