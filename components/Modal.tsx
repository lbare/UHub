import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
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

import { CaretLeft, CaretRight, MagnifyingGlass } from "phosphor-react-native";
import { Building } from "../models/Building";
import {
  DayOfWeek,
  daysOfWeekInOrder,
  getVendorHoursForDayString,
  isDayToday,
  isVendorCurrentlyOpen,
  vendorNextOpenOrCloseTimeString,
} from "../models/VendorHours";

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  changeVendor: (vendor: FoodVendor) => void;
  onModalHide: (gotoSearch: boolean) => void;
  vendor: FoodVendor;
  building: Building;
  openedModalFromSearch: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  changeVendor,
  onModalHide,
  vendor,
  building,
  openedModalFromSearch,
}) => {
  const hideModal = (exit: boolean) => {
    setModalVisible(false);
    setShowExpandedHours(false);
    onModalHide(!exit);
  };

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showExpandedHours, setShowExpandedHours] = useState(false);

  useEffect(() => {
    if (vendor && vendor.menu.sections.length > 0) {
      setSelectedSection(vendor.menu.sections[0].name);
    }
  }, [vendor]);

  return (
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
          className="mt-48 w-full h-full rounded-xl overflow-hidden"
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
          <ScrollView
            contentContainerStyle={{
              alignItems: "flex-start",
              paddingVertical: 16,
            }}
          >
            <Image
              source={{
                uri: vendor.image,
              }}
              className="-mt-4 w-full h-48 rounded-l"
            />

            {!openedModalFromSearch && (
              <TouchableOpacity
                className="absolute left-1 mt-20 w-8 h-8 rounded-full justify-center items-center"
                onPress={() => {
                  const previousVendor = getPreviousFoodVendorInBuilding(
                    vendor,
                    building
                  );
                  changeVendor(previousVendor);
                }}
              >
                <CaretLeft color="#ededed" weight="bold" size={32} />
              </TouchableOpacity>
            )}

            {!openedModalFromSearch && (
              <TouchableOpacity
                className="absolute right-1 mt-20 w-8 h-8 rounded-full justify-center items-center"
                onPress={() => {
                  const previousVendor = getNextFoodVendorInBuilding(
                    vendor,
                    building
                  );
                  changeVendor(previousVendor);
                }}
              >
                <CaretRight color="#ededed" weight="bold" size={32} />
              </TouchableOpacity>
            )}

            <View className="w-full pl-3 pr-3">
              <Text className="text-2xl font-bold mt-2 text-neutral-200">
                {vendor.name}
              </Text>

              {vendor.description && (
                <Text className="text-base -mt-1 mb-1 text-neutral-300">
                  {vendor.description}
                </Text>
              )}

              <View className={`flex flex-row items-center`}>
                <Text
                  className={`text-base font-semibold ${
                    isVendorCurrentlyOpen(vendor.hours)
                      ? "text-green-400"
                      : "text-red-400 opacity-70"
                  }`}
                >
                  {isVendorCurrentlyOpen(vendor.hours) ? "Open" : "Closed"}
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
                      name={showExpandedHours ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="grey"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {showExpandedHours && (
                <View className="mt-1 w-full">
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

              <View className="flex flex-wrap w-full flex-row justify-evenly items-center mb-2 overflow-auto">
                {vendor.menu.sections.length > 1 &&
                  vendor.menu.sections.map((section, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`justify-center items-center mx-2 my-2 h-6 ${
                        selectedSection && selectedSection === section.name
                          ? "border-b-2 border-white"
                          : ""
                      } `}
                      onPress={() => setSelectedSection(section.name)}
                    >
                      <Text
                        className={`text-xs font-extrabold ${
                          selectedSection && selectedSection === section.name
                            ? "text-neutral-200 text-base"
                            : "text-neutral-400 font-semibold"
                        }`}
                      >
                        {section.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>

              {vendor.menu.sections.map((section, index) => {
                if (section.name === selectedSection) {
                  return (
                    <React.Fragment key={index}>
                      <View className="mb-6 w-full">
                        {section.items.map((item, itemIndex) => (
                          <View className="flex flex-row" key={itemIndex}>
                            <View
                              className="flex-1"
                              style={{
                                backgroundColor:
                                  itemIndex % 2 == 0 ? "#282828" : "#1D1D1D",
                                marginLeft: -15,
                                paddingLeft: 15,
                                marginRight: -15,
                                paddingRight: 15,
                                paddingBottom: 8,
                                paddingVertical: 8,
                              }}
                            >
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
                          </View>
                        ))}
                      </View>
                    </React.Fragment>
                  );
                }
                return null;
              })}
              {/* Extra view below is a Work around for the scroll not going all the way to the bottom */}
              <View className="h-48"></View>
            </View>
          </ScrollView>

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
  );
};

export default CustomModal;
