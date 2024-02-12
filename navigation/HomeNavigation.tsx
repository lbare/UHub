import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeMap from "../screens/HomeMap";

const Stack = createStackNavigator();

const HomeNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMap"
        component={HomeMap}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
