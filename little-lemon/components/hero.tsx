import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

interface HeroSectionProps {
  showSearchBar?: boolean;
  onSearchChange?: (text: string) => void;
  searchValue?: string;
}

export default function HeroSection({ 
  showSearchBar = true, 
  onSearchChange,
  searchValue = ''
}: HeroSectionProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchIconPress = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  const handleSearchChange = (text: string) => {
    if (onSearchChange) {
      onSearchChange(text);
    }
  };

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
            {!isSearchActive ? (
              <TouchableOpacity 
                style={styles.searchIcon} 
                onPress={handleSearchIconPress}
              >
                <Text style={styles.searchText}>🔍</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.searchInputContainer}>
                <Text style={styles.searchIconInInput}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search menu items..."
                  placeholderTextColor="#666"
                  value={searchValue}
                  onChangeText={handleSearchChange}
                  autoFocus={true}
                />
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={handleCloseSearch}
                >
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
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
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 50,
  },
  searchIconInInput: {
    fontSize: 18,
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Remove default padding on Android
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  closeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});