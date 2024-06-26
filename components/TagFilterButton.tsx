import { Text, Pressable } from "react-native";
import { MenuItemTag } from "../models/Menu";
import MenuSearch from "../services/MenuSearch";
import React from "react";
interface TagFilterButtonProps {
  text: string;
  tags: MenuItemTag[];
  menuSearchObject: MenuSearch;
  onUpdate: () => void;
}

const TagFilterButton: React.FC<TagFilterButtonProps> = ({
  text,
  tags,
  menuSearchObject,
  onUpdate,
}) => {
  const checkIfToggled = (): boolean => {
    if (!menuSearchObject) {
      return false;
    }
    for (let i = 0; i < menuSearchObject.curTagFilters.length; i++) {
      if (
        tags.length === menuSearchObject.curTagFilters[i].length &&
        tags.every((el) => menuSearchObject.curTagFilters[i].includes(el))
      ) {
        return true;
      }
    }
    return false;
  };

  const [isToggled, setToggle] = React.useState(checkIfToggled());

  const handlePress = () => {
    setToggle(!isToggled);
    if (isToggled) {
      menuSearchObject.removeTagFilter(tags);
    } else {
      menuSearchObject.addTagFilter(tags);
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
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 10,
        borderColor: isToggled ? "#EB6931FF" : "#EDEDED6E",
        borderWidth: 1,
        borderRadius: 30,
        alignSelf: "flex-start",
      }}
    >
      <Text
        style={{
          color: "#EDEDED",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {text ?? "Tag Button"}
      </Text>
    </Pressable>
  );
};

export default TagFilterButton;
