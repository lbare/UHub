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

  const hoursArray = vendor
    ? Object.entries(vendor.hours).map(([day, timeRanges]) => ({
        day,
        timeRanges,
      }))
    : [];

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
      className="h-full w-full flex items-center justify-start"
    >
      <TouchableOpacity
        onPressOut={hideModal}
        className="w-full h-1/2 absolute top-0"
      />
      {vendor && (
        <View
          className="bg-white mt-48 w-full h-full rounded-xl"
          style={{
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
              style={{
                height: 150,
                width: "100%",
              }}
              className="-mt-4 w-full"
            />

            <View className="pl-3 pr-3">
              <Text className="text-2xl font-bold mt-2">{vendor.name}</Text>

              {vendor.description && (
                <Text className="text-base -mt-1 mb-1">
                  {vendor.description}
                </Text>
              )}

              <View className={`flex flex-row items-center`}>
                <Text
                  className={`text-base font-semibold ${
                    isVendorCurrentlyOpen(vendor.hours)
                      ? "text-green-600"
                      : "text-red-600 opacity-70"
                  }`}
                >
                  {isVendorCurrentlyOpen(vendor.hours) ? "Open" : "Closed"}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowExpandedHours(!showExpandedHours)}
                >
                  <View className="flex flex-row items-center">
                    <Text className="font-normal opacity-80">
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
                  <Text className="font-normal opacity-60">Open Hours</Text>
                  {hoursArray.map(({ day, timeRanges }, index) => (
                    <View
                      key={index}
                      className="flex flex-row items-center mt-1"
                    >
                      {/*Couldn't figureout a way to do the minWidth with Tailwind min-w-__ did not work */}
                      <Text
                        style={{ minWidth: 100 }}
                        className={`'font-light' ${
                          isDayToday(day as DayOfWeek)
                            ? "opacity-80"
                            : "opacity-60"
                        }`}
                      >
                        {day}:
                      </Text>
                      <Text
                        className={`'font-light' opacity-60 ${
                          isDayToday(day as DayOfWeek)
                            ? "opacity-80"
                            : "opacity-60"
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
              <View className="border-b border-gray-300 mt-2" />

              <View className="flex flex-wrap w-full flex-row justify-evenly items-center mb-2 overflow-auto">
                {vendor.menu.sections.length > 1 &&
                  vendor.menu.sections.map((section, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`justify-center items-center mx-2 my-2 h-6`}
                      onPress={() => setSelectedSection(section.name)}
                    >
                      <Text
                        className={`text-xs font-extrabold ${
                          selectedSection && selectedSection === section.name
                            ? "text-black text-base underline"
                            : "text-gray-500"
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
                          <View
                            key={itemIndex}
                            className=""
                            style={{
                              backgroundColor:
                                itemIndex % 2 == 0 ? "#F0F0F0" : "white",
                              marginLeft: -15,
                              paddingLeft: 15,
                              marginRight: -15,
                              paddingRight: 15,
                              paddingBottom: 8,
                              paddingVertical: 8,
                            }}
                          >
                            <Text className="text-lg font-medium">
                              {item.name}
                            </Text>
                            {item.description && (
                              <Text className="text-sm mt-1">
                                {item.description}
                              </Text>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <Text className="text-xs mt-1 font-semibold text-gray-500 mr-2 inline-block">
                                {item.tags.join(", ")}
                              </Text>
                            )}
                            <Text className="text-md mt-1 font-semibold">
                              ${item.price}
                            </Text>
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
            <View className="bg-gray-500 opacity-100 rounded-full h-6 w-6" />
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
