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
  const [hoursVisible, setHoursVisible] = useState<boolean>(false);

  const hoursArray = vendor
    ? Object.entries(vendor.hours).map(([day, timeRanges]) => ({
      day,
      timeRanges,
    }))
    : [];

    const toggleHoursVisibility = () => {
      setHoursVisible(!hoursVisible);
    };

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
              paddingHorizontal: 10,
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
            <Text className="text-lg mb-2">
              {isVendorCurrentlyOpen(vendor.hours)
                ? "Open now"
                : "Closed now"}
            </Text>


              <TouchableOpacity onPress={toggleHoursVisibility} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 4, textAlign: 'left' }}>
                Hours {hoursVisible ? '▲' : '▼'}
              </Text>
              </TouchableOpacity>

              {hoursVisible && hoursArray.map(({ day, timeRanges }, index) => (
                <View key={index} style={{ flexDirection: "row", justifyContent: "flex-start", width: "100%", marginBottom: 2 }}>
                  <Text style={{ fontSize: 16, minWidth: 90 }}>{day}:</Text>
                  <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                    {getVendorHoursForDayString(vendor.hours, day as DayOfWeek)
                      .split(', ') // Split the hours string by comma and space
                      .map((timeRange, i) => (
                        <Text key={i} style={{ fontSize: 16 }}>
                          {i > 0 ? '' : ''}{timeRange}
                        </Text>
                      ))
                    }
                  </View>
                </View>
              ))}


            <View className="flex flex-wrap w-full flex-row justify-evenly items-center mb-2 overflow-auto">

              {vendor.menu.sections.length > 0 &&
                vendor.menu.sections.map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`justify-center items-center mx-2 my-2 ${selectedSection && selectedSection === section.name
                      ? "border-b-2 border-black"
                      : ""
                      }`}
                    onPress={() => setSelectedSection(section.name)}
                  >
                    <Text
                      className={`text-m font-extrabold ${selectedSection && selectedSection === section.name
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
                      {section.items.map((item, itemIndex) => (
                        <View key={itemIndex} className="" style={{ backgroundColor: (itemIndex % 2 == 0) ? "#FAF2F0" : "white", marginLeft: -15, paddingLeft: 15, marginRight: -15, paddingRight: 15, paddingBottom: 8 }}>
                          <Text className="text-lg font-medium">
                            {item.name}
                          </Text>
                          {item.description && (
                            <Text className="text-sm mt-1">{item.description}</Text>
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

          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
