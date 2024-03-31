import React, { forwardRef, useEffect } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
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
    useEffect(() => {
      console.log(buildingFilters);
    }, [buildingFilters]);

    return (
      <View
        className="flex w-full items-center justify-center mt-16"
        style={shadowStyle}
      >
        <View
          className="flex flex-row w-5/6 h-16 shadow-xl rounded-2xl items-center"
          style={{
            backgroundColor: "#E5E5E5",
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
            className="h-12 w-12 justify-center items-center"
            onPress={() => {
              if (setBuildingFiltersOpen) {
                setBuildingFiltersOpen(!buildingFiltersOpen);
              }
            }}
          >
            {buildingFilters &&
              (buildingFilters.length === 0 ? (
                <>
                  <Funnel size={32} color="#282828" weight="bold" />
                </>
              ) : buildingFilters.includes("ALL") ? (
                <>
                  <Funnel size={32} color="#282828" weight="fill" />
                </>
              ) : (
                <>
                  <View className="absolute z-50 top-0 right-0 flex w-5 h-5 justify-center items-center bg-neutral-200 rounded-full">
                    <View
                      className="flex w-4 h-4 justify-center items-center rounded-full"
                      style={{ backgroundColor: "#EB6931" }}
                    >
                      <Text className="text-neutral-200 font-bold text-center">
                        {buildingFilters.length}
                      </Text>
                    </View>
                  </View>
                  <Funnel size={32} color="#282828" weight="fill" />
                </>
              ))}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

// buildingFilters.includes("ALL") &&
