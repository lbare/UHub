import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import {
  X,
  Camera as CameraIcon,
  Lightning,
  LightningA,
  LightningSlash,
  ArrowFatRight,
  ArrowClockwise,
  CaretDown,
  CaretUp,
  Check,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/HomeNavigation";
import FirebaseUserImageService from "../services/Firebase/firebase-user-image-submittion";
import DropDownPicker from "react-native-dropdown-picker";
import { FoodVendor } from "../models/FoodVendor";
import { BuildingContext } from "../contexts/BuildingContext";
import { Building } from "../models/Building";

type HomeMapNavigationProp = StackNavigationProp<StackParamList, "HomeMap">;

interface UploadProps {
  vendor?: FoodVendor;
}

type DropDownDataType = {
  label: string;
  value: string;
};

const Upload: React.FC<UploadProps> = ({ vendor }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [vendors, setVendors] = useState<DropDownDataType[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>("");

  const navigation = useNavigation<HomeMapNavigationProp>();
  const firebaseService = new FirebaseUserImageService();
  const [buildings, setBuildings] = useState<Building[]>(
    useContext(BuildingContext)
  );

  useEffect(() => {
    const newVendors = buildings.reduce((acc, building) => {
      const buildingVendors = building.vendors.map((vendor) => ({
        label: vendor.name,
        value: vendor.name,
      }));
      return [...acc, ...buildingVendors];
    }, [] as DropDownDataType[]);

    const sortedVendors = newVendors.sort((a, b) => {
      const nameA = a.label.replace(/^The\s/, "").toUpperCase();
      const nameB = b.label.replace(/^The\s/, "").toUpperCase();
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    setVendors(sortedVendors);
  }, [buildings]);

  async function takePhoto() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, exif: false };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  }

  const handleTakePhoto = async () => {
    await takePhoto();
  };

  const handleSubmit = async () => {
    if (photo && selectedVendor) {
      setLoading(true);
      try {
        await firebaseService.uploadImageAsync(selectedVendor, photo);
        setPhoto(null);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        navigation.navigate("HomeMap");
      }
    }
  };

  const toggleFlashMode = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else if (flashMode === FlashMode.on) {
      setFlashMode(FlashMode.auto);
    } else {
      setFlashMode(FlashMode.off);
    }
  };

  return (
    <View className="flex w-full h-full justify-center items-center bg-neutral-900 pt-8">
      {!photo ? (
        <>
          {cameraRef && (
            <Camera
              ref={cameraRef}
              style={{ width: "100%", height: "70%" }}
              type={CameraType.back}
              flashMode={flashMode}
            />
          )}
          <View className="flex-row absolute top-16 w-full justify-between items-center">
            <TouchableOpacity
              className="h-24 w-20 justify-center items-center"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View className="justify-center items-center rounded-full h-12 w-12">
                <X size={36} color="#ededed" weight="bold" />
              </View>
            </TouchableOpacity>
            <View className="w-7/12 justify-center items-center">
              <DropDownPicker
                items={vendors}
                multiple={false}
                setValue={setSelectedVendor}
                value={selectedVendor}
                open={pickerOpen}
                setOpen={setPickerOpen}
                placeholder="Select a vendor"
                autoScroll={true}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 2,
                  borderColor: "#ededed",
                }}
                containerStyle={{
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#ededed",
                  borderColor: "#ededed",
                  borderWidth: 0,
                  borderTopColor: "#ededed",
                  borderTopWidth: 1,
                }}
                listItemContainerStyle={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D1D1D1",
                }}
                listItemLabelStyle={{
                  color: "#171717",
                }}
                textStyle={{
                  paddingLeft: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#ededed",
                }}
                ArrowDownIconComponent={() => (
                  <CaretDown size={20} color="#ededed" weight="bold" />
                )}
                ArrowUpIconComponent={() => (
                  <CaretUp size={20} color="#ededed" weight="bold" />
                )}
                TickIconComponent={() => (
                  <Check size={20} color="#171717" weight="bold" />
                )}
              />
            </View>
            <TouchableOpacity
              className="h-24 w-20 justify-center items-center"
              onPress={toggleFlashMode}
            >
              <View className="justify-center items-center rounded-full h-12 w-12">
                {flashMode === FlashMode.off ? (
                  <LightningSlash size={36} color="#ededed" />
                ) : flashMode === FlashMode.auto ? (
                  <LightningA size={36} color="#ededed" weight="fill" />
                ) : (
                  <Lightning size={36} color="#ededed" weight="fill" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="absolute bottom-10 w-24 h-24 rounded-full justify-center items-center mb-4 bg-white shadow-lg"
            onPress={handleTakePhoto}
          >
            <CameraIcon size={44} color="#154058" weight="fill" />
          </TouchableOpacity>
        </>
      ) : (
        <View className="flex w-full h-full justify-center items-center">
          <View
            className="w-full h-full justify-center items-center"
            style={{ opacity: modalVisible ? 0.5 : 1 }}
          >
            <View className="absolute top-20 z-50 w-7/12 justify-center items-center">
              <DropDownPicker
                items={vendors}
                multiple={false}
                disabled={modalVisible}
                setValue={setSelectedVendor}
                value={selectedVendor}
                open={pickerOpen}
                setOpen={setPickerOpen}
                placeholder="Select a vendor"
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 2,
                  borderColor: "#ededed",
                }}
                containerStyle={{
                  borderWidth: 0,
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#ededed",
                  borderColor: "#ededed",
                  borderWidth: 0,
                  borderTopColor: "#ededed",
                  borderTopWidth: 1,
                }}
                listItemContainerStyle={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#D1D1D1",
                }}
                listItemLabelStyle={{
                  color: "#171717",
                }}
                textStyle={{
                  paddingLeft: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#ededed",
                }}
                ArrowDownIconComponent={() => (
                  <CaretDown size={20} color="#ededed" weight="bold" />
                )}
                ArrowUpIconComponent={() => (
                  <CaretUp size={20} color="#ededed" weight="bold" />
                )}
                TickIconComponent={() => (
                  <Check size={20} color="#171717" weight="bold" />
                )}
              />
            </View>
            <Image
              source={{ uri: photo }}
              style={{ width: "90%", height: "63%" }}
              className="rounded-2xl"
            />
            <View className="absolute bottom-0 flex flex-row h-36 w-full justify-between items-center px-10">
              <TouchableOpacity
                className="w-20 h-20 rounded-full justify-center items-center mb-4 bg-white shadow-xl"
                onPress={() => setPhoto(null)}
              >
                <ArrowClockwise size={44} color="#154058" weight="fill" />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-20 h-20 rounded-full justify-center items-center mb-4 bg-white shadow-xl"
                onPress={() => {
                  if (selectedVendor !== "") {
                    setModalVisible(true);
                  } else {
                    setPickerOpen(true);
                  }
                }}
              >
                <ArrowFatRight size={44} color="#154058" weight="fill" />
              </TouchableOpacity>
            </View>
          </View>
          {modalVisible && (
            <View className="absolute top-1/3 w-3/4 h-1/3 rounded-xl bg-blue justify-between items-center px-6 py-10">
              {!loading ? (
                <>
                  <Text className="text-2xl font-bold text-center text-white">
                    Are you sure you want to submit?
                  </Text>
                  <View className="flex flex-row w-full justify-between items-center">
                    <TouchableOpacity
                      className="w-24 h-12 rounded-full justify-center items-center"
                      onPress={() => {
                        setModalVisible(false);
                        setPhoto(null);
                      }}
                    >
                      <Text className="text-xl font-semibold text-center text-white">
                        Retake
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-24 h-12 rounded-full justify-center items-center bg-orange"
                      onPress={handleSubmit}
                    >
                      <Text className="text-xl font-semibold text-center text-white">
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View className="w-full h-full justify-center items-center">
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Upload;
