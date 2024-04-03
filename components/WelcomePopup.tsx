import React, { useState } from "react";
import { View, Text, Pressable, Modal, Image } from "react-native";

interface WelcomePopupProps {
  isVisible: boolean;
  pageNum?: number;
  onClose: () => void;
}
export const WelcomePopup: React.FC<WelcomePopupProps> = ({
  isVisible,
  pageNum = 0,
  onClose,
}) => {
  const [curPageNum, setCurPageNum] = useState<number>(pageNum);
  const TOTAL_PAGE_COUNT = 2;

  const nextPage = () => {
    setCurPageNum(curPageNum + 1);
  };

  const gotoPage = (num: number) => {
    setCurPageNum(num);
  };

  const closePopup = () => {
    setCurPageNum(0);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center">
        {curPageNum === 0 && (
          <View className="bg-white rounded-lg shadow-lg p-4 w-3/4 h-1/3 flex-column justify-center items-center">
            <Pressable
              className="bg-orange w-3/4 p-2 h-12 rounded-lg justify-center items-center"
              onPress={() => {
                gotoPage(1);
              }}
            >
              <Text className="text-white font-bold text-center text-lg">
                What's New
              </Text>
            </Pressable>
            <Pressable
              className="bg-orange w-3/4 p-2 h-12 rounded-lg mt-4 justify-center items-center"
              onPress={() => {
                gotoPage(1);
              }}
            >
              <Text className="text-white font-bold text-center text-lg">
                Welcome Tour
              </Text>
            </Pressable>
            <Pressable
              className="border-orange border-2 w-3/4 p-2 h-12 rounded-lg mt-4 justify-center items-center"
              onPress={closePopup}
            >
              <Text className="text-orange font-bold text-center text-lg">
                Close
              </Text>
            </Pressable>
          </View>
        )}
        {curPageNum === 1 && (
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
                UHub is a centralized platform to discover and explore resources
                on campus.
                {"\n"}
                {"\n"}
                UHub, allows you to find the locations of food outlets on campus
                and browse their menus. There are also various search options
                available to find specific food items, dietary restrictions, and
                more.
              </Text>
            </View>
            <View className="flex-row justify-items-center space-x-7">
              <Pressable
                className="border-orange border-2 w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
                onPress={closePopup}
              >
                <Text className="text-orange font-bold text-center text-lg">
                  Close
                </Text>
              </Pressable>
              <Pressable
                className="bg-orange w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
                onPress={nextPage}
              >
                <Text className="text-white font-bold text-center text-lg">
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        {(curPageNum < 0 || curPageNum >= TOTAL_PAGE_COUNT) && (
          <View className="bg-white rounded-lg shadow-lg p-4 w-5/6 h-2/3 justify-center items-center">
            <View className="w-full">
              <Text className="text-left text-xl font-bold mt-4">
                No page to display...
              </Text>
              <Text className="text-left text-base mt-4">
                The page you are looking for does not exist.
              </Text>
            </View>
            <View className="flex-row justify-items-center space-x-7">
              <Pressable
                className="border-orange border-2 w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
                onPress={closePopup}
              >
                <Text className="text-orange font-bold text-center text-lg">
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};
