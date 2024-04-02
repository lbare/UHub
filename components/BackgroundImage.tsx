import React, { ReactNode } from "react";
import { ImageBackground, ImageSourcePropType } from "react-native";

interface BackgroundImageProps {
  children?: ReactNode;
  source?: ImageSourcePropType;
}

const BackgroundImage = ({ children, source }: BackgroundImageProps) => {
  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      resizeMode="cover"
      source={source}
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;
