import React from "react";
import { View, Text, Pressable, Modal } from "react-native";

interface UserPopupProps {
  isVisible: boolean;
  email: string | null;
  onLogout: () => void;
  onSignIn: () => void;
  onClose: () => void;
}
export const UserPopup: React.FC<UserPopupProps> = ({
  isVisible,
  email,
  onLogout,
  onSignIn,
  onClose,
}) => (
  <Modal visible={isVisible} transparent={true} animationType="slide">
    <View className="flex-1 justify-center items-center">
      <View className="bg-white rounded-lg shadow-lg p-4 w-3/4 h-1/3 justify-center items-center">
        {email ? (
          <>
            <Text className="mb-10 text-center text-lg">
              Logged in as {email}
            </Text>
            <Pressable
              className="bg-orange p-2 rounded-lg w-1/2"
              onPress={onLogout}
            >
              <Text className="text-white font-bold text-center text-lg">
                Log Out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text className="mb-10 text-center text-lg">Not logged in</Text>
            <Pressable
              className="bg-orange p-2 h-12 rounded-lg w-1/2 justify-center items-center"
              onPress={onSignIn}
            >
              <Text className="text-white font-bold text-center text-lg">
                Sign In
              </Text>
            </Pressable>
          </>
        )}
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
