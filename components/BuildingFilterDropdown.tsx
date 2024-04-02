import { Text, View, ViewStyle } from "react-native";
import { Building } from "../models/Building";
import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

interface BuildingFilterDropdownProps {
  buildings: Building[];
  selectedItems: any[];
  style?: ViewStyle;
  onUpdate: (newList: any) => void;
  setBuildingFiltersOpen: (open: boolean) => void;
}

const BuildingFilterDropdown = forwardRef(
  (
    {
      buildings,
      style,
      onUpdate,
      selectedItems,
      setBuildingFiltersOpen,
    }: BuildingFilterDropdownProps,
    ref
  ) => {
    const multiSelectRef = useRef(null);

    useImperativeHandle(ref, () => ({
      openDropdown: () => {
        (multiSelectRef.current as any)?._toggleSelector();
      },
      closeDropdown: () => {
        if ((multiSelectRef.current as any)?.state.selector) {
          (multiSelectRef.current as any)?._toggleSelector();
        }
      },
    }));

    const createBuildingList = () => {
      return buildings.map((building: Building) => ({
        name: building.name,
        id: building.code,
        isSubItem: true,
      }));
    };

    // the list of buildings in the format required by the dropdown component
    const items = [
      {
        name: "Select All Buildings",
        id: "ALL",
        isSubItem: false,
        children: createBuildingList(),
      },
    ];

    const customIconRenderer = (item: { isSubItem: any }) => {
      const iconName = item.isSubItem ? "check-box" : "check-box-outline-blank";
      const color = item.isSubItem ? "#EB6931" : "#EDEDED";
      return <MaterialIcons name={iconName} size={20} color={color} />;
    };

    return (
      <SectionedMultiSelect
        ref={multiSelectRef}
        items={items}
        IconRenderer={
          <>{(item: { isSubItem: any }) => customIconRenderer(item)}</>
        }
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
        hideSearch={true}
        onConfirm={() => setBuildingFiltersOpen(false)}
        selectedIconComponent={
          <MaterialIcons name="check-box" size={20} color="#EB6931" />
        }
        unselectedIconComponent={
          <MaterialIcons
            name="check-box-outline-blank"
            size={20}
            color="#EDEDED2A"
          />
        }
        selectToggleIconComponent={
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#EDEDED" />
        }
        colors={{
          primary: "#EB6931",
          text: "#e5e5e5",
          subText: "#a3a3a3",
          itemBackground: "#00000000",
          subItemBackground: "#00000000",
          selectToggleTextColor: "#EDEDED",
        }}
        styles={{
          container: {
            backgroundColor: "#1D1D1D",
            marginTop: "42%",
            marginBottom: "42%",
            paddingTop: 20,
            borderRadius: 20,
          },
          searchBar: {
            backgroundColor: "#EDEDED",
            margin: 10,
            borderRadius: 20,
          },

          item: {
            borderWidth: 1,
            borderColor: "#EDEDED2A",
            borderRadius: 10,
            padding: 15,
            height: 40,
            marginBottom: 15,
          },
          itemText: {
            fontSize: 20,
          },
          subItem: {
            borderWidth: 1,
            borderColor: "#EDEDED2A",
            marginBottom: 15,
            padding: 15,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
          },
          subItemText: {
            color: "#EDEDED",
            fontSize: 18,
            fontWeight: "400",
          },
          selectedItem: {
            backgroundColor: "#383838",
            borderWidth: 0,
          },
          selectedSubItem: {
            backgroundColor: "#383838",
          },
          button: {
            backgroundColor: "#EB6931",
            height: 60,
          },
        }}
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
  }
);

export default BuildingFilterDropdown;
