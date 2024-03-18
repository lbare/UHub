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
  curSearchInput: string;
}

const TagFilterButton: React.FC<TagFilterButtonProps> = ({
  text,
  tag,
  menuSearchObject,
  curSearchInput,
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
        // TODO: Fix this hack doesn't work right now
        // TODO: Make this better. Just temporary solution
        menuSearchObject.searchAllMenuItems(curSearchInput);
      }}
      title={text ?? "Tag Button"}
      color={isToggled ? "#0055FF" : "#000088"}
    />
  );
};

export default TagFilterButton;
