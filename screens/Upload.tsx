import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import BackgroundImage from "../components/BackgroundImage";
import { X } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/HomeNavigation";

type HomeMapNavigationProp = StackNavigationProp<StackParamList, "HomeMap">;

const Upload: React.FC = () => {
  const [vendor, setVendor] = useState<string>("");
  const [vendorFocused, setVendorFocused] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const navigation = useNavigation<HomeMapNavigationProp>();

  useEffect(() => {
    console.log(photo);
  }, [photo]);

  useEffect(() => {
    if (cameraOpen) setCameraOpen(false);
  }, [photo]);

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 0.1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  }

  const handleTakePhoto = async () => {
    setLoading(true);
    await takePhoto();
    setLoading(false);
  };

  if (cameraOpen && permission && permission.granted) {
    return (
      <View className="flex w-full h-full justify-center items-center">
        <Camera
          ref={cameraRef}
          style={{ width: "100%", height: "100%" }}
          className="w-full h-full justify-end items-center pb-16"
          type={CameraType.front}
        >
          <TouchableOpacity
            className="w-5/6 h-12 rounded-full justify-center items-center mb-4 bg-orange"
            onPress={handleTakePhoto}
          >
            <Text className="text-white font-bold text-base">Take Photo</Text>
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }

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
      <View className="flex w-full h-full justify-end items-center">
        <View className="flex w-full h-2/3 justify-evenly items-center px-10">
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
              photo ? "bg-neutral-500" : "bg-blue"
            }`}
            onPress={() => {
              requestPermission();
              setCameraOpen(true);
            }}
            disabled={!!photo}
          >
            <Text className="text-white font-bold text-base">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCameraOpen(true);
              setPhoto(null);
            }}
            className="w-full rounded-full justify-center items-center mb-4"
            style={{
              height: 300,
            }}
          >
            {photo && (
              <Image
                source={{ uri: photo }}
                style={{ width: 300, height: 300 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Upload;
