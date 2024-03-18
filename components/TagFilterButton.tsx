import { View, Image, Text, ImageSourcePropType, Button } from "react-native";
import Coordinates from "../models/Coordinates";
import { MenuItemTag } from "../models/Menu";
import MenuSearch from "../services/MenuSearch";
import { FoodVendor } from "../models/FoodVendor";
import { Callout, Marker } from "react-native-maps";
import React from "react";
interface TagFilterButtonProps {
  text: string;
  tag: MenuItemTag;
  menuSearchObject: MenuSearch;
  onUpdate: () => void;
}

const TagFilterButton: React.FC<TagFilterButtonProps> = ({
  text,
  tag,
  menuSearchObject,
  onUpdate,
}) => {
  const [isToggled, setToggle] = React.useState(false);

  return (
    <Button
      onPress={() => {
        console.log("Tag Filter Pressed:", tag);
        setToggle(!isToggled);
        if (isToggled) {
          menuSearchObject.removeTagFilter(tag);
        } else {
          menuSearchObject.addTagFilter(tag);
        }
        // Calls the parent's search function to search with the
        // existing query and new filters
        onUpdate();
      }}
      title={text ?? "Tag Button"}
      color={isToggled ? "#0055FF" : "#000088"}
    />
  );
};

export default TagFilterButton;
