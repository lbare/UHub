import { Text, Pressable, View } from "react-native";
import { MenuItemTag } from "../models/Menu";
import MenuSearch from "../services/MenuSearch";
import { Building, buildingExamples } from "../models/Building";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

interface BuildingFilterDropdownProps {
  selectedItems: any[];
  // text: string;
  // tag: MenuItemTag;
  // menuSearchObject: MenuSearch;
  onUpdate: (newList: any) => void;
}

const BuildingFilterDropdown: React.FC<BuildingFilterDropdownProps> = ({
  // text,
  // tag,
  // menuSearchObject,
  onUpdate,
  selectedItems,
}) => {
  // const [selectedItems, setSelectedItems] = React.useState<any[]>([]);

  const createBuildingList = (buildings: Building[], startingId: number) => {
    let buildingList: any[] = [];
    let curId: number = startingId;

    buildings.forEach((building: Building) => {
      buildingList.push({
        name: building.name,
        id: building.code,
      });
      curId++;
    });

    return buildingList;
  };

  const items = [
    {
      name: "All Buildings",
      id: "ALL",
      // these are the children or 'sub items'
      children: createBuildingList(buildingExamples, 1),
    },
    // {
    //   // next parent item
    //  ...
    // },
  ];

  // const onSelectedItemsChange = (selectedItems: any) => {
  //   this.setState({ selectedItems });
  // };

  return (
    <SectionedMultiSelect
      items={items}
      IconRenderer={Icon as unknown as React.ReactNode}
      uniqueKey="id"
      subKey="children"
      selectText="Add building filters"
      searchPlaceholderText="Search buildings..."
      showDropDowns={false}
      onSelectedItemsChange={onUpdate}
      selectedItems={selectedItems}
      // selectChildren={true}
      highlightChildren={true}
      showRemoveAll={false}
      showChips={false}
      headerComponent={
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              padding: 10,
            }}
          >
            Building Filters
          </Text>
        </View>
      }
    />
  );
};

export default BuildingFilterDropdown;
