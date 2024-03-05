import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { MagnifyingGlass, X } from "phosphor-react-native";

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  shadowStyle?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  onFocus,
  onBlur,
  shadowStyle,
}) => {
  return (
    <View
      className="flex w-full items-center justify-center mt-16"
      style={shadowStyle}
    >
      <View className="flex flex-row w-5/6 h-16 bg-blue-400 shadow-xl rounded-2xl">
        <View className="flex w-16 h-full justify-center items-center">
          <MagnifyingGlass size={24} color="#383838" weight="bold" />
        </View>
        <TextInput
          className="h-full w-3/5 justify-center items-center font-semiBold text-2xl"
          placeholder="Search"
          placeholderTextColor="#383838"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          onFocus={onFocus}
        />
        {searchInput !== "" ? (
          <TouchableOpacity
            className="h-full w-16 justify-center items-center"
            onPress={() => setSearchInput("")}
          >
            <X size={24} color="#5F1515" weight="bold" />
          </TouchableOpacity>
        ) : (
          <View className="h-full w-16" />
        )}
      </View>
    </View>
  );
};
