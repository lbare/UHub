import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import { X } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/HomeNavigation";

type HomeMapNavigationProp = StackNavigationProp<StackParamList, "HomeMap">;

const Upload: React.FC = () => {
  const [vendor, setVendor] = useState<string>("");
  const [vendorFocused, setVendorFocused] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<HomeMapNavigationProp>();

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        className="absolute top-8 left-0 z-10 h-24 w-24 justify-center items-center"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View className="justify-center items-center rounded-full h-8 w-8 bg-blue">
          <X size={24} color="#ededed" weight="bold" />
        </View>
      </TouchableOpacity>
      <BackgroundImage source={require("../assets/splash-login.png")} />
      <View className="flex w-full h-80 justify-evenly items-center px-10">
        <TextInput
          placeholder="Vendor"
          value={vendor}
          returnKeyType="next"
          onChangeText={(text) => setVendor(text)}
          className={`w-5/6 h-12 border-2 bg-white rounded-lg px-4 ${
            vendorFocused && vendor !== ""
              ? "border-blue"
              : "border-neutral-400"
          }`}
          style={{
            fontSize: 16,
            color: "#154058",
            fontWeight: "bold",
          }}
          onBlur={() => {
            setVendorFocused(false);
          }}
          onFocus={() => {
            setVendorFocused(true);
          }}
        />
        <TouchableOpacity
          className={`w-5/6 h-12 rounded-full justify-center items-center mb-4 ${
            photo === "" ? "bg-neutral-500" : "bg-blue"
          }`}
        >
          {!loading ? (
            <Text className="text-white font-bold text-base">Take Photo</Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Upload;
