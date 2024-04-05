import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FoodVendor,
  getNextFoodVendorInBuilding,
  getPreviousFoodVendorInBuilding,
} from "../models/FoodVendor";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  Heart,
  Camera,
  X,
} from "phosphor-react-native";
import { Building } from "../models/Building";
import {
  DayOfWeek,
  daysOfWeekInOrder,
  getVendorHoursForDayString,
  isDayToday,
  isVendorCurrentlyOpen,
  vendorNextOpenOrCloseTimeString,
} from "../models/VendorHours";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/HomeNavigation";
import menuItemLikeService from "../services/Firebase/firebase-menuitem-like";
import { MenuItem } from "../models/Menu";

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  changeVendor: (vendor: FoodVendor) => void;
  onModalHide: (gotoSearch: boolean) => void;
  vendor: FoodVendor;
  setVendor: (vendor: FoodVendor) => void;
  building: Building;
  openedModalFromSearch: boolean;
  selectedItem: MenuItem | null;
  clearSelectedItem: () => void;
}

type ModalNavigationProp = StackNavigationProp<StackParamList>;

const CustomModal: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  changeVendor,
  onModalHide,
  vendor,
  setVendor,
  building,
  openedModalFromSearch,
  selectedItem,
  clearSelectedItem,
}) => {
  const navigation = useNavigation<ModalNavigationProp>();
  const authManager = new FirebaseAuthManager();
  const itemRefs = useRef(new Map());
  const [selectedItemState, setSelectedItemState] = useState({
    item: null as MenuItem | null,
    section: null as string | null,
  });

  const hideModal = (exit: boolean) => {
    setModalVisible(false);
    setShowExpandedHours(false);
    onModalHide(!exit);
  };

  const buildItemID = (menuItem: MenuItem, vendor: FoodVendor): string => {
    return `${vendor.name}-${menuItem.name}`.toLowerCase().replace(/\s/g, "-");
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    setLastScrollY(y);
  };

  useEffect(() => {
    // Find the section of the selected item
    const foundSectionName = vendor.menu.sections.find((section) =>
      section.items.some((item) => item.name === selectedItem?.name)
    )?.name;

    if (selectedItem && foundSectionName) {
      // Set the selected item and section in the state
      setSelectedItemState({ item: selectedItem, section: foundSectionName });
    }
  }, [selectedItem, vendor.menu.sections]);

  useEffect(() => {
    if (selectedItemState.item && selectedItemState.section) {
      setSelectedSection(selectedItemState.section);
    }
  }, [selectedItemState]);

  useEffect(() => {
    if (selectedItem) {
      const foundSectionIndex = vendor.menu.sections.findIndex((section) =>
        section.items.some((item) => item.name === selectedItem.name)
      );

      if (foundSectionIndex !== -1) {
        const selectedSection = vendor.menu.sections[foundSectionIndex];
        const selectedItemIndex = selectedSection.items.findIndex(
          (item) => item.name === selectedItem.name
        );

        if (selectedItemIndex > 0) {
          // Check if the item is not already the first one
          const newItems = [...selectedSection.items];
          const [selectedItemObject] = newItems.splice(selectedItemIndex, 1);
          newItems.unshift(selectedItemObject);

          const newSections = [...vendor.menu.sections];
          newSections[foundSectionIndex] = {
            ...selectedSection,
            items: newItems,
          };

          const newVendor = {
            ...vendor,
            menu: { ...vendor.menu, sections: newSections },
          };
          setVendor(newVendor); // Update the vendor only if necessary

          setSelectedSection(newSections[foundSectionIndex].name);
        }
      }
    }
  }, [selectedItem, vendor]);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (scrollViewRef.current && lastScrollY > 160) {
      scrollViewRef.current.scrollTo({ y: 160, animated: true });
    }
  }, [selectedSection]);

  const [showExpandedHours, setShowExpandedHours] = useState(false);
  const [itemLikesCount, setItemLikesCount] = useState<Map<string, string>>(
    new Map()
  );

  const [doesUserLikeItem, setDoesUserLikeItem] = useState<
    Map<string, boolean>
  >(new Map());

  useEffect(() => {
    if (!vendor || vendor.menu.sections.length === 0) return;

    setSelectedSection(vendor.menu.sections[0].name);

    const allItemIDs = vendor.menu.sections.flatMap((section) =>
      section.items.map((item) => buildItemID(item, vendor))
    );

    const totalLikes = allItemIDs.map(
      (id) =>
        [id, menuItemLikeService.getTotalLikesForItem(id).toString()] as [
          string,
          string
        ]
    );

    const userLikesBools = allItemIDs.map(
      (id) =>
        [id, menuItemLikeService.doesUserLikeItem(id)] as [string, boolean]
    );

    const likesCountMap = new Map<string, string>(totalLikes);
    setItemLikesCount(likesCountMap);
    const userLikesMap = new Map<string, boolean>(userLikesBools);
    setDoesUserLikeItem(userLikesMap);
  }, [vendor]);

  const toggleLikesForItem = (itemId: string): void => {
    if (!authManager.getCurrentUserUID()) {
      setModalVisible(false);
      navigation.push("Login");
    } else {
      if (doesUserLikeItem.get(itemId)) {
        const newLikesCount = menuItemLikeService.removeLikeFromItem(itemId);
        setItemLikesCount(itemLikesCount.set(itemId, newLikesCount.toString()));
        setDoesUserLikeItem(
          new Map<string, boolean>(doesUserLikeItem.set(itemId, false))
        );
      } else {
        const newLikesCount = menuItemLikeService.addLikeToItem(itemId);
        setItemLikesCount(itemLikesCount.set(itemId, newLikesCount.toString()));
        setDoesUserLikeItem(
          new Map<string, boolean>(doesUserLikeItem.set(itemId, true))
        );
      }
    }
  };

  const isMenuItemHidden = (item: MenuItem): boolean => {
    if (item.hidden === true) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        className="h-full w-full items-center justify-start"
        style={{
          backgroundColor: "#1D1D1D",
        }}
      >
        <TouchableOpacity
          onPressOut={() => {
            hideModal(true);
          }}
          className="w-full h-1/2 absolute top-0"
        />
        {vendor && (
          <View
            className="mt-36 w-full h-full rounded-xl overflow-hidden"
            style={{
              backgroundColor: "#1D1D1D",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -5,
              },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <View>
              <Image
                source={{
                  uri: vendor.image,
                }}
                className="w-full h-48 rounded-l absolute"
              />
              <View className="w-full h-8 bg-transparent"></View>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={128}
                className="w-fullz-10"
                stickyHeaderIndices={[1]}
              >
                <View className="w-full h-40"></View>
                <View className="bg-neutral-900">
                  <View className="w-full flex-row justify-between items-center">
                    <TouchableOpacity
                      className="w-8 h-8 pl-3 rounded-full justify-center items-center"
                      onPress={() => {
                        if (!openedModalFromSearch) {
                          const previousVendor = getNextFoodVendorInBuilding(
                            vendor,
                            building
                          );
                          changeVendor(previousVendor);
                        }
                      }}
                    >
                      {!openedModalFromSearch && (
                        <CaretLeft color="#EDEDEDD2" weight="bold" size={32} />
                      )}
                    </TouchableOpacity>

                    <View className="flex w-5/6 items-center justify-center">
                      <Text className="text-2xl font-bold mt-2 text-neutral-200">
                        {vendor.name}
                      </Text>

                      {vendor.description && (
                        <View className="w-11/12">
                          <Text className="text-xs text-center my-1 text-neutral-300">
                            {vendor.description}
                          </Text>
                        </View>
                      )}
                      <View className={`flex flex-row items-center`}>
                        <Text
                          className={`text-base font-semibold ${
                            isVendorCurrentlyOpen(vendor.hours)
                              ? "text-green-400"
                              : "text-red-400 opacity-70"
                          }`}
                        >
                          {isVendorCurrentlyOpen(vendor.hours)
                            ? "Open"
                            : "Closed"}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            setShowExpandedHours(!showExpandedHours)
                          }
                        >
                          <View className="flex flex-row items-center">
                            <Text className="font-normal opacity-80 text-neutral-300">
                              {" · " +
                                vendorNextOpenOrCloseTimeString(vendor.hours) +
                                ""}
                            </Text>
                            <Feather
                              name={
                                showExpandedHours
                                  ? "chevron-up"
                                  : "chevron-down"
                              }
                              size={20}
                              color="grey"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      className="w-8 h-8 pr-3 rounded-full justify-center items-center"
                      onPress={() => {
                        if (!openedModalFromSearch) {
                          const previousVendor =
                            getPreviousFoodVendorInBuilding(vendor, building);
                          changeVendor(previousVendor);
                        }
                      }}
                    >
                      {!openedModalFromSearch && (
                        <CaretRight color="#EDEDEDD2" weight="bold" size={32} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {showExpandedHours && (
                    <View className="mt-1 w-11/12 mx-4">
                      <Text className="font-normal opacity-60 text-neutral-200">
                        Open Hours
                      </Text>
                      {daysOfWeekInOrder.map((day, index) => (
                        <View
                          key={index}
                          className="flex flex-row items-center mt-1"
                        >
                          {/*Couldn't figureout a way to do the minWidth with Tailwind min-w-__ did not work */}
                          <Text
                            style={{ minWidth: 100 }}
                            className={`font-light text-neutral-200 ${
                              isDayToday(day as DayOfWeek)
                                ? "opacity-100 font-semibold"
                                : "opacity-80"
                            }`}
                          >
                            {day}:
                          </Text>
                          <Text
                            className={`font-light text-neutral-400 ${
                              isDayToday(day as DayOfWeek)
                                ? "opacity-100 font-semibold"
                                : "opacity-80"
                            }`}
                          >
                            {getVendorHoursForDayString(
                              vendor.hours,
                              day as DayOfWeek
                            )}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  <View
                    className={`w-full border-t-2 border-neutral-500 mt-2 ${
                      vendor.menu.sections &&
                      vendor.menu.sections.length > 1 &&
                      "py-2"
                    }`}
                  >
                    <ScrollView
                      contentContainerStyle={{
                        flexGrow: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        paddingRight: 8,
                      }}
                      style={{
                        maxHeight: 50,
                      }}
                      indicatorStyle="white"
                      pagingEnabled
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {vendor.menu.sections.length > 1 &&
                        vendor.menu.sections.map((section, index) => (
                          <TouchableOpacity
                            key={index}
                            className="justify-center items-center my-2 mx-2 h-8"
                            style={{
                              borderWidth: 1,
                              borderRadius: 16,
                              paddingVertical: 5,
                              paddingHorizontal: 12,
                              backgroundColor:
                                selectedSection === section.name
                                  ? "#EB6931"
                                  : "#1D1D1D",
                              borderColor:
                                selectedSection === section.name
                                  ? "#EB6931"
                                  : "#B9B9B925",
                            }}
                            onPress={() => setSelectedSection(section.name)}
                          >
                            <Text
                              className={`text-sm font-bold ${
                                selectedSection &&
                                selectedSection === section.name
                                  ? "text-white"
                                  : "text-neutral-400"
                              }`}
                            >
                              {section.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </View>
                </View>
                <View style={{ minHeight: 750 }}>
                  {vendor.menu.sections.map((section, index) => {
                    if (section.name === selectedSection) {
                      return (
                        <View key={index}>
                          {section.description && (
                            <View className="w-full justify-center items-center bg-neutral-900">
                              <Text className="text-xs font-normal text-neutral-300 mb-2 px-2">
                                {section.description}
                              </Text>
                            </View>
                          )}

                          {section.sides && section.sides.length > 0 && (
                            <View
                              className="px-4 py-2"
                              style={{ backgroundColor: "#422828" }}
                            >
                              <Text className="text-md font-bold text-neutral-200 mb-1">
                                Sides
                              </Text>

                              {section.sides.map((side, sideIndex) => (
                                <Text
                                  key={sideIndex}
                                  className="text-md font-normal text-neutral-300 mb-1"
                                >
                                  {side.name}: ${side.price.toFixed(2)}{" "}
                                  {side.description && `- ${side.description}`}
                                </Text>
                              ))}
                            </View>
                          )}
                          {section.items.map((item, itemIndex) => {
                            return (
                              !isMenuItemHidden(item) && (
                                <View className="flex flex-row" key={itemIndex}>
                                  <View
                                    className={`flex w-full px-4 ${
                                      itemIndex % 2 === 0
                                        ? "bg-neutral-800"
                                        : "bg-neutral-900"
                                    } ${
                                      item === selectedItem
                                        ? "border-4 border-orange"
                                        : ""
                                    }`}
                                    style={{
                                      paddingBottom: 8,
                                      paddingVertical: 8,
                                    }}
                                  >
                                    <View className="flex-row justify-between items-center">
                                      <View className="flex-initial">
                                        <Text className="text-base font-medium text-neutral-200">
                                          {item.name}
                                        </Text>
                                        {item.description && (
                                          <Text className="text-sm mt-1 text-neutral-400">
                                            {item.description}
                                          </Text>
                                        )}

                                        {item.tags && item.tags.length > 0 && (
                                          <Text className="text-xs mt-1 font-semibold text-neutral-400 mr-2 inline-block">
                                            {item.tags.join(", ")}
                                          </Text>
                                        )}

                                        {/* Show main price only if there are no sizes */}

                                        {(!item.sizes ||
                                          item.sizes.length === 0) && (
                                          <Text className="text-md mt-1 font-medium text-neutral-200">
                                            ${item.price.toFixed(2)}
                                          </Text>
                                        )}

                                        {/* Sizes */}

                                        {item.sizes &&
                                          item.sizes.length > 0 && (
                                            <View className="mt-1">
                                              {item.sizes.map(
                                                (size, sizeIndex) => (
                                                  <Text
                                                    key={sizeIndex}
                                                    className="text-sm font-medium text-neutral-300"
                                                  >
                                                    {size.name}: $
                                                    {size.price.toFixed(2)}
                                                  </Text>
                                                )
                                              )}
                                            </View>
                                          )}

                                        {/* Sides */}

                                        {item.sides &&
                                          item.sides.length > 0 && (
                                            <View className="mt-1">
                                              {item.sides.map(
                                                (side, sideIndex) => (
                                                  <View
                                                    key={sideIndex}
                                                    className="mb-1"
                                                  >
                                                    <Text className="text-sm font-normal text-neutral-300">
                                                      {side.name}
                                                    </Text>

                                                    {side.description && (
                                                      <Text className="text-sm font-light text-neutral-400">
                                                        {side.description}
                                                      </Text>
                                                    )}

                                                    {side.price > 0 && (
                                                      <Text className="text-sm font-semibold text-neutral-200">
                                                        ${side.price.toFixed(2)}
                                                      </Text>
                                                    )}
                                                  </View>
                                                )
                                              )}
                                            </View>
                                          )}
                                      </View>
                                      <TouchableOpacity
                                        onPress={() =>
                                          toggleLikesForItem(
                                            buildItemID(item, vendor)
                                          )
                                        }
                                      >
                                        <View className="w-14 h-12 justify-center items-center flex-none">
                                          <Heart
                                            size={20}
                                            color="#EB6931"
                                            weight={
                                              doesUserLikeItem.get(
                                                buildItemID(item, vendor)
                                              )
                                                ? "fill"
                                                : "regular"
                                            }
                                          />
                                          <Text className="text-xs text-neutral-300 mt-2">
                                            {itemLikesCount.get(
                                              buildItemID(item, vendor)
                                            ) || "-1"}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </View>
                              )
                            );
                          })}
                          <View
                            style={{
                              height: 200,
                            }}
                          />
                        </View>
                      );
                    }
                    return null;
                  })}
                </View>
              </ScrollView>
            </View>
            <View className="absolute top-3 right-4">
              <TouchableOpacity
                className="flex opacity-100 rounded-full h-8 w-8 justify-center items-center"
                style={{ backgroundColor: "#ededed" }}
                onPress={() => {
                  hideModal(true);
                }}
              >
                <X size={22} color="#171717" weight="bold" />
              </TouchableOpacity>
            </View>
            <View className="absolute top-3 right-16">
              <TouchableOpacity
                className="flex opacity-100 rounded-full h-8 w-8 justify-center items-center"
                style={{ backgroundColor: "#ededed" }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Upload", { vendor: vendor.name });
                }}
              >
                <Camera size={22} color="#171717" weight="fill" />
              </TouchableOpacity>
            </View>

            {openedModalFromSearch && (
              <View className="absolute top-3 left-4">
                <TouchableOpacity
                  className="flex opacity-100 rounded-full h-8 w-8 justify-center items-center"
                  style={{ backgroundColor: "#ededed" }}
                  onPress={() => {
                    hideModal(false);
                  }}
                >
                  <MagnifyingGlass size={20} color="#154058" weight="bold" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </Modal>
    </>
  );
};

export default CustomModal;
