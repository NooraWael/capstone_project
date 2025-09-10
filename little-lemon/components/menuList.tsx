import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MenuItem, { MenuItemData } from './menu';

interface MenuListProps {
  menuItems: MenuItemData[];
  onItemPress?: (item: MenuItemData) => void;
}

export default function MenuList({ menuItems, onItemPress }: MenuListProps) {
  const renderMenuItem = ({ item }: { item: MenuItemData }) => (
    <MenuItem item={item} onPress={onItemPress} />
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderMenuItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});