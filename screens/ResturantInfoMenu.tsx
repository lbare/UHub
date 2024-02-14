import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, MenuItem } from '../models/Menu';

interface MenuProps {
  menu: Menu;
}

const ResturantInfoMenu: React.FC<MenuProps> = ({ menu : Menu }) => {
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={Menu.sections[0].items}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.name}
      />
    </View>
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
