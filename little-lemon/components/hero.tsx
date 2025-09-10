import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface HeroSectionProps {
  showSearchBar?: boolean;
}

export default function HeroSection({ showSearchBar = false }: HeroSectionProps) {
  return (
    <View style={styles.heroSection}>
      <View style={styles.heroContent}>
        <Text style={styles.restaurantName}>Little Lemon</Text>
        <Text style={styles.location}>Chicago</Text>
        <Text style={styles.description}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
        
        {showSearchBar && (
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon}>
              <Text style={styles.searchText}>🔍</Text>
            </View>
          </View>
        )}
      </View>
      
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
        }}
        style={styles.heroImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: "#495E57",
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  heroContent: {
    flex: 1,
    paddingRight: 15,
  },
  restaurantName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F4CE14",
    marginBottom: 5,
  },
  location: {
    fontSize: 24,
    color: "white",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
    marginBottom: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  searchContainer: {
    marginTop: 10,
  },
  searchIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 20,
  },
});