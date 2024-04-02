import React from "react";
import { View, Text, Pressable, Modal, Image } from "react-native";

interface WelcomePopupProps {
  isVisible: boolean;
  onClose: () => void;
}
export const WelcomePopup: React.FC<WelcomePopupProps> = ({
  isVisible,
  onClose,
}) => (
  <Modal visible={isVisible} transparent={true} animationType="slide">
    <View className="flex-1 justify-center items-center">
      <View className="bg-white rounded-lg shadow-lg p-4 w-5/6 h-2/3 items-center">
        <Image
          source={require("../assets/full-logo.png")}
          style={{
            maxWidth: "80%",
            maxHeight: "20%",
            objectFit: "contain",
            // borderWidth: 2, // TODO: for testing
            // borderColor: "black",
          }}
        />
        <View className="w-full">
          <Text className="text-left text-xl font-bold mt-4">
            Welcome to UHub!
          </Text>
          <Text className="text-left text-base mt-4">
            UHub is a centralized platform to discover and explore resources on
            campus.
            {"\n"}
            {"\n"}
            UHub, allows you to find the locations of food outlets on campus and
            browse their menus. There are also various search options available
            to find specific food items, dietary restrictions, and more.
          </Text>
        </View>
        <View className="flex-row justify-items-center space-x-7">
          <Pressable
            className="border-orange border-2 w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
            onPress={onClose}
          >
            <Text className="text-orange font-bold text-center text-lg">
              Close
            </Text>
          </Pressable>
          <Pressable
            className="bg-orange w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
            onPress={onClose}
          >
            <Text className="text-white font-bold text-center text-lg">
              Next
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);
