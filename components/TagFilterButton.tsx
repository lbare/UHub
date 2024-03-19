import { Text, Pressable } from "react-native";
import { MenuItemTag } from "../models/Menu";
import MenuSearch from "../services/MenuSearch";
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
  const [isToggled, setToggle] = React.useState(
    menuSearchObject.curTagFilters.includes(tag)
  );

  const handlePress = () => {
    setToggle(!isToggled);
    if (isToggled) {
      menuSearchObject.removeTagFilter(tag);
    } else {
      menuSearchObject.addTagFilter(tag);
    }
    // Calls the parent's search function to redo search
    // with the existing query and new filters
    onUpdate();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: isToggled ? "#EB6931FF" : "#00000000",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 30,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
        {text ?? "Tag Button"}
      </Text>
    </Pressable>
  );
};

export default TagFilterButton;
