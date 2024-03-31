import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeMap from "../screens/HomeMap";
import Login from "../screens/Login";

export type StackParamList = {
  HomeMap: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const LoginScreenWrapper: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Login modalVisible={modalVisible} setModalVisible={setModalVisible} />
  );
};

const HomeNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true, // Enable animation
        animationTypeForReplace: "push", // Set the animation type
      }}
    >
      <Stack.Screen
        name="HomeMap"
        component={HomeMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreenWrapper}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
