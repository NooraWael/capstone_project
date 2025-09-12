import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import HeroSection from '../components/hero';
import CategoryTabs from '../components/categories';
import MenuList from '../components/menuList';
import { MenuItemData } from '../components/menu';
import { initDatabase, getMenuItems, getCategories, seedDatabase } from '../services/database';

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Starters');
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItemData[]>([]);
  const [categories, setCategories] = useState<string[]>(['Starters', 'Mains', 'Desserts', 'Drinks']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    filterMenuItems();
  }, [selectedCategory, allMenuItems, searchText]);

  const initializeDatabase = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Initializing database...');
      await initDatabase();
      
      console.log('Seeding database...');
      await seedDatabase();
      
      console.log('Loading categories...');
      await loadCategories();
      
      console.log('Loading menu items...');
      await loadMenuItems();
      
    } catch (error) {
      console.error('Error initializing database:', error);
      setError('Failed to load menu data');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const dbCategories = await getCategories();
      if (dbCategories.length > 0) {
        setCategories(dbCategories);
        if (!dbCategories.includes(selectedCategory)) {
          setSelectedCategory(dbCategories[0]);
        }
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Keep default categories as fallback
    }
  };

  const loadMenuItems = async () => {
    try {
      const items = await getMenuItems();
      console.log('Loaded menu items:', items.length);
      setAllMenuItems(items);
    } catch (error) {
      console.error('Error loading menu items:', error);
      setError('Failed to load menu items');
    }
  };

  const filterMenuItems = () => {
    let filtered = allMenuItems;

    // Filter by search text if provided
    if (searchText.trim()) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      // Only filter by category if no search text
      filtered = filtered.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setMenuItems(filtered);
  };

  const handleMenuItemPress = (item: MenuItemData) => {
    console.log('Menu item pressed:', item.name);
    // Navigate to item detail or add to cart
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchText(''); // Clear search when changing categories
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#495E57" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText} onPress={initializeDatabase}>
            Tap to retry
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showProfile={true} />
      
      <HeroSection 
        showSearchBar={true} 
        onSearchChange={handleSearchChange}
        searchValue={searchText}
      />
      
      {/* Only show categories when not searching */}
      {!searchText.trim() && (
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      )}
      
      {/* Show search results info */}
      {searchText.trim() && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsText}>
            {menuItems.length} results for "{searchText}"
          </Text>
        </View>
      )}
      
      <MenuList
        menuItems={menuItems}
        onItemPress={handleMenuItemPress}
      />
      
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#495E57',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryText: {
    fontSize: 16,
    color: '#495E57',
    textDecorationLine: 'underline',
  },
  searchResultsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchResultsText: {
    fontSize: 16,
    color: '#495E57',
    fontWeight: '600',
  },
});