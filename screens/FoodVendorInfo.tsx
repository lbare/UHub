import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FoodVendor, foodVendorExample } from '../models/FoodVendor';
import { MenuItem } from '../models/Menu';
import { ScrollView } from 'react-native-gesture-handler';

interface MenuProps {
  vendor: FoodVendor;
}

const ResturantInfoMenu: React.FC<MenuProps> = ({ vendor : vendor }) => {
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View className='px-1' style={styles.menuItemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (

    <ScrollView className="relative bg-white">
      <View className="px-1">
        <Image
          source={{ uri: vendor.image }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <Text className="text-3xl font-bold">{vendor.name}</Text>
        <Text className="text-gray-500 mt-2 pb-2">{vendor.description}</Text>
        <Text className="text-md font-bold mt-1">Operating Hours:</Text>
        {Object.entries(vendor.hours).map(([day, { open, close }]) => (
          <View key={day} className="flex-row items-center space-x-1 mt-1">
            <Text className="text-sm">{day}:</Text>
            <Text className="text-sm">{open} - {close}</Text>
          </View>
        ))}
        <Text className="text-md font-bold mt-4">Location:</Text>
        <Text className="text-gray-500 pb-4">{vendor.location.latitude}, {vendor.location.longitude}</Text>
      </View>

      {vendor.menu.sections[0].items.map((menuItem) => renderMenuItem({item: menuItem}))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  menuItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});


export default ResturantInfoMenu;
