import React, { forwardRef } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { CaretLeft, Funnel } from "phosphor-react-native";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  onBlur?: () => void;
  shadowStyle?: any;
  selected?: boolean;
  setSelected: (selected: boolean) => void;
  clearResults?: () => void;
  buildingFiltersOpen?: boolean;
  setBuildingFiltersOpen?: (open: boolean) => void;
  buildingFilters?: any[];
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  (
    {
      searchInput,
      setSearchInput,
      onBlur,
      shadowStyle,
      selected,
      setSelected,
      clearResults,
      buildingFiltersOpen,
      setBuildingFiltersOpen,
      buildingFilters,
    },
    ref
  ) => {
    return (
      <View
        className="flex w-full items-center justify-center mt-16"
        style={shadowStyle}
      >
        <View
          className="flex flex-row w-5/6 h-16 shadow-xl rounded-2xl"
          style={{
            backgroundColor: "#EDEDED",
          }}
        >
          <TouchableOpacity
            className="flex w-16 h-full justify-center items-center"
            onPress={() => {
              setSelected(false);
              setSearchInput("");
              if (clearResults) clearResults();
            }}
          >
            <CaretLeft size={24} color="#282828" weight="bold" />
          </TouchableOpacity>
          <TextInput
            ref={ref}
            className="h-full w-3/5 justify-center items-center font-bold text-2xl pb-1"
            style={{ color: "#282828" }}
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            onFocus={() => setSelected(true)}
            returnKeyType="search"
          />
          <TouchableOpacity
            className="h-full w-16 justify-center items-center"
            onPress={() => {
              if (setBuildingFiltersOpen) {
                setBuildingFiltersOpen(!buildingFiltersOpen);
              }
            }}
          >
            {buildingFilters && buildingFilters.length > 0 ? (
              <Funnel size={24} color="#282828" weight="fill" />
            ) : (
              <Funnel size={24} color="#282828" weight="bold" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);
