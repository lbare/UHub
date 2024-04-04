import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, Image, Easing } from "react-native";

interface ActionItem {
  icon: React.ReactElement;
  action: () => void;
}

interface FloatingButtonProps {
  icon: any;
  actions: ActionItem[];
  showActions: boolean;
  toggleActions: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  actions,
  showActions,
  toggleActions,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const radiusValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const spinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleValue, {
      toValue: showActions ? 1 : 1.1,
      useNativeDriver: true,
    }).start();

    toggleActions();

    Animated.timing(radiusValue, {
      toValue: showActions ? 0 : 1,
      duration: 150,
      easing: showActions
        ? Easing.back(1.5)
        : Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  };

  const actionButtons = actions.map((actionItem, index) => {
    const angles = [270, 225, 180];
    const angle = angles[index];
    const radian = (angle * Math.PI) / 180;
    const radius = 90;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    const animatedStyle = {
      transform: [
        {
          translateX: radiusValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, x],
          }),
        },
        {
          translateY: radiusValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, y],
          }),
        },
      ],
      opacity: radiusValue.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0.2, 1],
      }),
    };

    return (
      <Animated.View
        key={index}
        style={[
          {
            position: "absolute",
            right: 10,
            bottom: 10,
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          onPress={actionItem.action}
          className="bg-white p-2 rounded-full"
        >
          {actionItem.icon}
        </TouchableOpacity>
      </Animated.View>
    );
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={spinAnimation}
        style={{ zIndex: 15 }}
      >
        <Animated.View
          className="bg-white rounded-full p-2 shadow-md"
          style={{
            transform: [
              {
                scale: scaleValue,
              },
            ],
          }}
        >
          <Image source={icon} style={{ width: 55, height: 55 }} />
        </Animated.View>
      </TouchableOpacity>
      {actionButtons}
    </View>
  );
};

export default FloatingButton;
