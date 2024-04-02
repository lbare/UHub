import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  FoodVendor,
  getNextFoodVendorInBuilding,
  getPreviousFoodVendorInBuilding,
} from "../models/FoodVendor";
import LoginPage from "../screens/Login";
import FirebaseAuthManager from "../services/Firebase/firebase-auth";
import {
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  Heart,
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

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  changeVendor: (vendor: FoodVendor) => void;
  onModalHide: (gotoSearch: boolean) => void;
  vendor: FoodVendor;
  building: Building;
  openedModalFromSearch: boolean;
}

type ModalNavigationProp = StackNavigationProp<StackParamList>;

const CustomModal: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  changeVendor,
  onModalHide,
  vendor,
  building,
  openedModalFromSearch,
}) => {
  const navigation = useNavigation<ModalNavigationProp>();
  const authManager = new FirebaseAuthManager();

  const hideModal = (exit: boolean) => {
    setModalVisible(false);
    setShowExpandedHours(false);
    onModalHide(!exit);
  };

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isLoginModalVisible, setIsLoginModalVisible] =
    useState<boolean>(false);

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

    const allItems = vendor.menu.sections.flatMap((section) =>
      section.items.map((item) => item.name)
    );

    const totalLikes = allItems.map(
      (name) =>
        [name, menuItemLikeService.getTotalLikesForItem(name).toString()] as [
          string,
          string
        ]
    );

    const userLikesBools = allItems.map(
      (name) =>
        [name, menuItemLikeService.doesUserLikeItem(name)] as [string, boolean]
    );

    const likesCountMap = new Map<string, string>(totalLikes);
    setItemLikesCount(likesCountMap);
    const userLikesMap = new Map<string, boolean>(userLikesBools);
    setDoesUserLikeItem(userLikesMap);
  }, [vendor]);

  const toggleLikesForItem = (item: string): void => {
    if (!authManager.getCurrentUserUID()) {
      setModalVisible(false);
      navigation.push("Login");
    } else {
      if (doesUserLikeItem.get(item)) {
        const newLikesCount = menuItemLikeService.removeLikeFromItem(item);
        setItemLikesCount(itemLikesCount.set(item, newLikesCount.toString()));
        setDoesUserLikeItem(
          new Map<string, boolean>(doesUserLikeItem.set(item, false))
        );
      } else {
        const newLikesCount = menuItemLikeService.addLikeToItem(item);
        setItemLikesCount(itemLikesCount.set(item, newLikesCount.toString()));
        setDoesUserLikeItem(
          new Map<string, boolean>(doesUserLikeItem.set(item, true))
        );
      }
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
            <View
              style={{
                alignItems: "flex-start",
                paddingVertical: 8,
              }}
            >
              <Image
                source={{
                  uri: vendor.image,
                }}
                className="-mt-4 w-full h-48 rounded-l"
              />
              <View className="w-full justify-center items-center">
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
                        onPress={() => setShowExpandedHours(!showExpandedHours)}
                      >
                        <View className="flex flex-row items-center">
                          <Text className="font-normal opacity-80 text-neutral-300">
                            {" · " +
                              vendorNextOpenOrCloseTimeString(vendor.hours) +
                              ""}
                          </Text>
                          <Feather
                            name={
                              showExpandedHours ? "chevron-up" : "chevron-down"
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
                        const previousVendor = getPreviousFoodVendorInBuilding(
                          vendor,
                          building
                        );
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
                <View className="border-b border-neutral-300 mt-2" />

                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingRight: 8,
                    marginBottom: 8,
                  }}
                  indicatorStyle="white"
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="border-b-2 border-neutral-500"
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
                            selectedSection && selectedSection === section.name
                              ? "text-white"
                              : "text-neutral-400"
                          }`}
                        >
                          {section.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                {vendor.menu.sections.map((section, index) => {
                  if (section.name === selectedSection) {
                    return (
                      <React.Fragment key={index}>
                        <ScrollView className="mb-6 w-full">
                          {section.items.map((item, itemIndex) => (
                            <View className="flex flex-row" key={itemIndex}>
                              <View
                                className="flex-initial w-full px-4"
                                style={{
                                  backgroundColor:
                                    itemIndex % 2 == 0 ? "#282828" : "#1D1D1D",
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
                                    <Text className="text-md mt-1 font-semibold text-neutral-200">
                                      ${item.price.toFixed(2)}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() =>
                                      toggleLikesForItem(item.name)
                                    }
                                  >
                                    <View className="w-14 h-12 justify-center items-center flex-none">
                                      <Heart
                                        size={20}
                                        color="#EB6931"
                                        weight={
                                          doesUserLikeItem.get(item.name)
                                            ? "fill"
                                            : "regular"
                                        }
                                      />
                                      <Text className="text-xs text-neutral-300 mt-2">
                                        {itemLikesCount.get(item.name) || "-1"}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
                {/* Extra view below is a Work around for the scroll not going all the way to the bottom */}
                <View className="h-48" />
              </View>
            </View>
            <View className="w-full bg-neutral-500 h-0.5" />
            <View className="absolute top-3 right-4">
              <TouchableOpacity
                className="flex opacity-100 rounded-full h-8 w-8 justify-center items-center"
                style={{ backgroundColor: "#ededed" }}
                onPress={() => {
                  hideModal(true);
                }}
              >
                <Feather
                  name="x"
                  size={20}
                  color="#154058"
                  className="opacity-100"
                />
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
