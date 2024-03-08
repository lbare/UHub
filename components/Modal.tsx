import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FoodVendor } from "../models/FoodVendor";

import {
  DayOfWeek,
  getVendorHoursForDayString,
  isVendorCurrentlyOpen,
  vendorNextOpenOrCloseTimeString,
  isDayToday,
  daysOfWeekInOrder,
} from "../models/VendorHours";

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onModalHide: () => void;
  vendor: FoodVendor;
}

const CustomModal: React.FC<CustomModalProps> = ({
  modalVisible,
  setModalVisible,
  onModalHide,
  vendor,
}) => {
  const hideModal = () => {
    setModalVisible(false);
    setShowExpandedHours(false);
    onModalHide();
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
      onRequestClose={hideModal}
      transparent={true}
      onDismiss={hideModal}
      className="h-full w-full items-center justify-start"
      style={{
        backgroundColor: "#1D1D1D",
      }}
    >
      <TouchableOpacity
        onPressOut={hideModal}
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
            <View className="bg-neutral-500 opacity-100 rounded-full h-6 w-6" />
            <TouchableOpacity onPress={hideModal}>
              <Feather
                name="x"
                size={24}
                color="white"
                className="opacity-100"
                style={{ marginTop: -24 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
