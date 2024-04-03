import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Image,
  StyleProp,
  ViewStyle,
  Linking,
} from "react-native";

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

  const defaultPopupStyle: StyleProp<ViewStyle> = {
    width: "95%",
    height: "70%",
  };

  const nextPage = () => {
    setCurPageNum(curPageNum + 1);
  };

  const prevPage = () => {
    setCurPageNum(curPageNum - 1 > 0 ? curPageNum - 1 : 0);
  };

  const gotoPage = (num: number) => {
    setCurPageNum(num);
  };

  const closePopup = () => {
    setCurPageNum(0);
    onClose();
  };

  const prevNextButtons = (
    <View className="flex-row justify-items-center mb-4 space-x-7">
      <Pressable
        className="border-orange border-2 w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
        onPress={prevPage}
      >
        <Text className="text-orange font-bold text-center text-lg">
          Previous
        </Text>
      </Pressable>
      <Pressable
        className="bg-orange w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
        onPress={nextPage}
      >
        <Text className="text-white font-bold text-center text-lg">Next</Text>
      </Pressable>
    </View>
  );

  const pages = [
    /// Page 0 - Category Menu ///
    <View className="bg-white rounded-lg shadow-lg p-4 w-3/4 h-2/5 flex-column justify-center items-center">
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
        className="bg-orange w-3/4 p-2 h-12 rounded-lg mt-4 justify-center items-center"
        onPress={() => {
          gotoPage(pages.length - 1);
        }}
      >
        <Text className="text-white font-bold text-center text-lg">
          Send Feedback
        </Text>
      </Pressable>
      <Pressable
        className="border-orange border-2 w-3/4 p-2 h-12 rounded-lg mt-4 justify-center items-center"
        onPress={closePopup}
      >
        <Text className="text-orange font-bold text-center text-lg">Close</Text>
      </Pressable>
    </View>,

    /// Page 1 - Welcome tour intro ///
    <View
      className="bg-white rounded-lg shadow-lg p-4 items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1 items-center">
        <Image
          source={require("../assets/full-logo.png")}
          style={{
            maxWidth: "80%",
            maxHeight: "25%",
            objectFit: "contain",
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
            UHub, allows you to find the locations of amenities on campus and
            browse the menu of all food outlets. There are also various search
            options available to find specific food items filtered by dietary
            restrictions, buildings, and more.
          </Text>
        </View>
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
          <Text className="text-white font-bold text-center text-lg">Next</Text>
        </Pressable>
      </View>
    </View>,

    /// Page 2 - Welcome tour find vendors ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1">
        <Image
          className="rounded-t-lg"
          source={require("../assets/tutorial/tutorial_pins.png")}
          style={{
            maxWidth: "100%",
            height: "48%",
            objectFit: "cover",
          }}
        />
        <View className="w-full p-4">
          <Text className="text-left text-xl font-bold mb-4">
            Find food vendors and amenities
          </Text>
          <Text className="text-left text-base">
            Various pins on the map indicate the location of food vendors and
            amenities on campus.
            {"\n"}
            {"\n"}
            By clicking on pins, you can get more details about the vendor or
            amenity, such as their full menu, hours of operation, or special
            notices.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 3 - Welcome tour browse menu ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1">
        <Image
          className="rounded-t-lg"
          source={require("../assets/tutorial/tutorial_menu.png")}
          style={{
            maxWidth: "100%",
            height: "48%",
            objectFit: "cover",
          }}
        />
        <View className="w-full p-4">
          <Text className="text-left text-xl font-bold mb-4">
            Browse vendor food menus
          </Text>
          <Text className="text-left text-base">
            Clicking on a vendor pin will display their full menu.
            {"\n"}
            {"\n"}
            You can also see the vendor's hours of operations and how many
            people have liked certain items on the menu.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 4 - Welcome tour search ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1">
        <Image
          className="rounded-t-lg"
          source={require("../assets/tutorial/tutorial_search.png")}
          style={{
            maxWidth: "100%",
            height: "48%",
            objectFit: "cover",
          }}
        />
        <View className="w-full p-4">
          <Text className="text-left text-xl font-bold mb-4">
            Search all food items
          </Text>
          <Text className="text-left text-base">
            Clicking the search bar at the top of the app allows you to quickly
            search through all food items available on campus.
            {"\n"}
            {"\n"}
            Items can be filtered by dietary restrictions and currently open
            vendors.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 5 - Welcome tour building filters 1 ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1">
        <Image
          className="rounded-t-lg"
          source={require("../assets/tutorial/tutorial_building-filters.png")}
          style={{
            maxWidth: "100%",
            height: "48%",
            objectFit: "cover",
          }}
        />
        <View className="w-full p-4">
          <Text className="text-left text-xl font-bold mb-4">
            Filter results by building
          </Text>
          <Text className="text-left text-base">
            Clicking the filter icon at the right of the search bar allows you
            filter results by vendors located in a specific building.
            {"\n"}
            {"\n"}
            The icon also displays how many filters are currently active.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 6 - Welcome tour building filters 2 ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1">
        <Image
          className="rounded-t-lg"
          source={require("../assets/tutorial/tutorial_building-filters-2.png")}
          style={{
            maxWidth: "100%",
            height: "48%",
            objectFit: "cover",
          }}
        />
        <View className="w-full p-4">
          <Text className="text-left text-xl font-bold mb-4">
            Select filters
          </Text>
          <Text className="text-left text-base">
            Here you can select an assortment of buildings you want to filter
            by.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 7 - Welcome tour about the team ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1 w-full items-center">
        <Image
          source={require("../assets/full-logo.png")}
          style={{
            maxWidth: "80%",
            maxHeight: "30%",
            objectFit: "contain",
          }}
        />
        <View className="w-full px-4">
          <Text className="text-left text-xl font-bold mb-4">
            About the Team
          </Text>
          <Text className="text-left text-base">
            We are a team of four UVic students currently in a Software
            Engineering class on startup programming with the goal of developing
            an app that brings disjoint campus resources into one centralized
            and easy to use place. We are using this project to learn about
            building a new tech startup while also trying to solve some of the
            common problems we face daily as students on campus.
          </Text>
        </View>
      </View>
      {prevNextButtons}
    </View>,

    /// Page 8 - Feedback ///
    <View
      className="bg-white rounded-lg shadow-lg items-center"
      style={defaultPopupStyle}
    >
      <View className="flex-1 w-full items-center">
        <Image
          source={require("../assets/full-logo.png")}
          style={{
            maxWidth: "80%",
            maxHeight: "15%",
            margin: 10,
            objectFit: "contain",
          }}
        />
        <View className="w-full px-4">
          <Text className="text-left text-xl font-bold mb-4">
            Send us your feedback!
          </Text>
          <Text className="text-left text-base">
            We want to make this app as useful as possible for the campus
            community. Providing us with your feedback allows us to improve
            existing features and get an idea of what other features would best
            serve students.
            {"\n"}
            {"\n"}
            To send feedback later, click on the "?" button on the map, then
            click "send feeback".
          </Text>
          <Pressable
            className="p-2 h-12 rounded-lg mt-4 justify-center items-center"
            style={{
              backgroundColor: "#154058",
            }}
            onPress={() => {
              Linking.openURL("https://forms.gle/f4CxD4CVYF3d4KeE6");
            }}
          >
            <Text className="text-white font-bold text-center text-lg">
              Send Feedback
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-row justify-items-center mb-4 space-x-7">
        <Pressable
          className="border-orange border-2 w-1/3 p-2 h-12 rounded-lg mt-4 justify-center items-center"
          onPress={closePopup}
        >
          <Text className="text-orange font-bold text-center text-lg">
            Close
          </Text>
        </Pressable>
      </View>
    </View>,
  ];

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center">
        {curPageNum >= 0 && curPageNum < pages.length ? (
          pages[curPageNum]
        ) : (
          <View
            className="bg-white rounded-lg shadow-lg p-4 justify-center items-center"
            style={defaultPopupStyle}
          >
            <View className="w-full flex-1">
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
