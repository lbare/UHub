import React from "react";
import { View, Text, Pressable, Modal } from "react-native";

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
      <View className="bg-white rounded-lg shadow-lg p-4 w-3/4 h-1/3 justify-center items-center">
        <Text>This is the Welcome Popup!</Text>
        <Pressable
          className="bg-orange p-2 h-12 rounded-lg mt-4 w-1/2 justify-center items-center"
          onPress={onClose}
        >
          <Text className="text-white font-bold text-center text-lg">
            Close
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
