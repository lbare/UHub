import { Text, View, ViewStyle } from "react-native";
import { Building, buildingExamples } from "../models/Building";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

interface BuildingFilterDropdownProps {
  selectedItems: any[];
  style?: ViewStyle;
  onUpdate: (newList: any) => void;
}

const BuildingFilterDropdown: React.FC<BuildingFilterDropdownProps> = ({
  style,
  onUpdate,
  selectedItems,
}) => {
  // Creates the list of buildings in the format required by the dropdown component
  const createBuildingList = (buildings: Building[]) => {
    let buildingList: any[] = [];

    buildings.forEach((building: Building) => {
      buildingList.push({
        name: building.name,
        id: building.code,
      });
    });

    return buildingList;
  };

  // the list of buildings in the format required by the dropdown component
  const items = [
    {
      name: "All Buildings",
      id: "ALL",
      children: createBuildingList(buildingExamples),
    },
  ];

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
      highlightChildren={true}
      showRemoveAll={false}
      showChips={false}
      colors={{
        primary: "#EB6931",
        text: "#e5e5e5",
        subText: "#a3a3a3",
        itemBackground: "#00000000",
        subItemBackground: "#00000000",
      }}
      styles={{
        container: {
          backgroundColor: "#1D1D1D",
        },
        searchBar: {
          backgroundColor: "#EDEDED",
          margin: 10,
          borderRadius: 20,
        },
        selectToggle: {
          backgroundColor: "#EDEDED",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          ...style,
        },
        selectToggleText: {
          color: "#000000",
        },
      }}
      headerComponent={
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              padding: 10,
              marginTop: 10,
              color: "#e5e5e5",
            }}
          >
            Building Filters
          </Text>
        </View>
      }
      noResultsComponent={
        <View>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              paddingVertical: 30,
              color: "#e5e5e5",
            }}
          >
            No buildings containing food vendors found
          </Text>
        </View>
      }
    />
  );
};

export default BuildingFilterDropdown;
