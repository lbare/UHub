import React, { useRef } from "react";
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
  const scaleValue = useRef(new Animated.Value(1)).current;
  const actionAnimations = actions.map(
    () => useRef(new Animated.Value(0)).current
  );

  const toggleActionAnimations = () => {
    const baseDelay = 40;
    const duration = 150;

    actionAnimations.forEach((anim, index) => {
      const delay = showActions
        ? (actions.length - 1 - index) * baseDelay
        : index * baseDelay;

      Animated.timing(anim, {
        toValue: showActions ? 0 : 1,
        duration: duration,
        easing: showActions
          ? Easing.bezier(0.64, 0.06, 0.38, 0.95)
          : Easing.bezier(0.09, 0.79, 0.24, 0.88),
        delay: delay,
        useNativeDriver: true,
      }).start();
    });
  };

  const toggleMainAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        easing: Easing.bezier(0.64, 0.06, 0.38, 0.95),
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 75,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleAnimation = () => {
    toggleMainAnimation();
    toggleActions();
    toggleActionAnimations();
  };

  const actionButtons = actions.map((actionItem, index) => {
    const angles = [270, 225, 180];
    const angle = angles[index];
    const radian = (angle * Math.PI) / 180;
    const radius = 110;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    const animatedStyle = {
      transform: [
        {
          translateX: actionAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, x],
          }),
        },
        {
          translateY: actionAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, y],
          }),
        },
        // {
        //   scale: actionAnimations[index].interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 1],
        //   }),
        // },
      ],
      opacity: actionAnimations[index].interpolate({
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
          className="bg-white w-14 h-14 rounded-full shadow-md justify-center items-center"
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
        onPress={toggleAnimation}
        style={{ zIndex: 15 }}
      >
        <Animated.View
          className="bg-white rounded-full p-4 shadow-md"
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
