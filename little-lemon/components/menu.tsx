import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export interface MenuItemData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItemData;
  onPress?: (item: MenuItemData) => void;
}

export default function MenuItem({ item, onPress }: MenuItemProps) {
  return (
    <Pressable 
      style={styles.container}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  content: {
    flex: 1,
    paddingRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#495E57',
    lineHeight: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});