import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FoodVendor } from "../models/FoodVendor";

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
    ? Object.entries(vendor.hours).map(([day, { open, close }]) => ({
        day,
        open,
        close,
      }))
    : [];

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
          className="bg-white w-full mt-48 rounded-3xl"
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
            <Text className="text-3xl font-bold mb-4">{vendor.name}</Text>

            <Image
              source={{
                uri: vendor.image,
              }}
              style={{ width: "100%", height: 200, borderRadius: 16 }}
              className="mb-4"
            />
            {vendor.menu.sections.map((section, index) => (
              <View key={index} className="mb-6">
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
            ))}
            <View className="mt-4 w-full">
              <Text className="text-2xl font-bold mb-4 tr">Hours</Text>
              {hoursArray.map(({ day, open, close }, index) => (
                <View className="w-full flex-row justify-between items-center">
                  <Text key={index} className="text-lg mb-2 flex-1">
                    {day}:
                  </Text>
                  <View className="flex-1 items-center">
                    <Text key={`${index}-open`} className="text-lg mb-2">
                      {open} - {close}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
