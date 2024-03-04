import React, { useState, useEffect } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FoodVendor } from "../models/FoodVendor";

import {
  DayOfWeek,
  getVendorHoursForDayString,
  isVendorCurrentlyOpen,
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
    onModalHide();
  };

  const hoursArray = vendor
    ? Object.entries(vendor.hours).map(([day, timeRanges]) => ({
        day,
        timeRanges,
      }))
    : [];

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (vendor && vendor.menu.sections.length > 0) {
      setSelectedSection(vendor.menu.sections[0].name);
    }
  }, [vendor]);

  return (
    <Modal
      // animationType="slide"
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
          className="bg-white mt-48 w-full rounded-xl"
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
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={{
                uri: vendor.image,
              }}
              style={{ width: "100%", height: 200, borderRadius: 16 }}
              className="mb-4"
            />
            <Text className="text-3xl font-bold mb-4">{vendor.name}</Text>

            <View className="flex flex-wrap w-full flex-row justify-evenly items-center mb-2 overflow-auto">
              {vendor.menu.sections.length > 1 &&
                vendor.menu.sections.map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`justify-center items-center mx-2 my-2 ${
                      selectedSection && selectedSection === section.name
                        ? "border-b-2 border-black"
                        : ""
                    }`}
                    onPress={() => setSelectedSection(section.name)}
                  >
                    <Text
                      className={`text-m font-extrabold ${
                        selectedSection && selectedSection === section.name
                          ? "text-black text-lg"
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
                      <Text className="text-xl font-semibold mb-2">
                        {section.name}
                      </Text>
                      {section.items.map((item, itemIndex) => (
                        <View key={itemIndex} className="mb-4">
                          <Text className="text-lg font-medium">
                            {item.name} - ${item.price.toFixed(2)}
                          </Text>
                          {item.description && (
                            <Text className="text-sm">{item.description}</Text>
                          )}
                          {item.tags &&
                            item.tags.map((tag, tagIndex) => (
                              <Text
                                key={tagIndex}
                                className="text-xs font-semibold text-gray-500 mr-2 inline-block"
                              >
                                {tag}
                              </Text>
                            ))}
                        </View>
                      ))}
                    </View>
                  </React.Fragment>
                );
              }
              return null;
            })}

            <View className="mt-4 w-full">
              <Text className="text-2xl font-bold mb-4 tr">Hours</Text>

              <Text className="text-lg mb-2">
                {isVendorCurrentlyOpen(vendor.hours)
                  ? "Open now"
                  : "Closed now"}
              </Text>

              {hoursArray.map(({ day, timeRanges }, index) => (
                <React.Fragment key={index}>
                  <View className="w-full flex-row justify-between items-top">
                    <Text key={index} className="text-lg mb-2 flex-1">
                      {day}:
                    </Text>
                    <View className="flex-1">
                      <Text className="text-lg mb-2">
                        {getVendorHoursForDayString(
                          vendor.hours,
                          day as DayOfWeek
                        )}
                      </Text>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
