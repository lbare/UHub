import React, { forwardRef } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { X, CaretLeft } from "phosphor-react-native";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  onBlur?: () => void;
  shadowStyle?: any;
  selected?: boolean;
  setSelected: (selected: boolean) => void;
  clearResults?: () => void;
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
            <CaretLeft size={24} color="#154058" weight="bold" />
          </TouchableOpacity>
          <TextInput
            ref={ref}
            className="h-full w-3/5 justify-center items-center font-bold text-2xl pb-1"
            style={{ color: "#154058" }}
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            onFocus={() => setSelected(true)}
            returnKeyType="search"
          />
          {searchInput !== "" ? (
            <TouchableOpacity
              className="h-full w-16 justify-center items-center"
              onPress={() => {
                setSearchInput("");
              }}
            >
              <X size={24} color="#154058" weight="bold" />
            </TouchableOpacity>
          ) : (
            <View className="h-full w-16" />
          )}
        </View>
      </View>
    );
  }
);
