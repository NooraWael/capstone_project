import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryTabs({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryTabsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.tab,
              selectedCategory === category && styles.selectedTab
            ]}
            onPress={() => onCategorySelect(category)}
          >
            <Text style={[
              styles.tabText,
              selectedCategory === category && styles.selectedTabText
            ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  tabsContainer: {
    marginBottom: 10,
  },
  tab: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#495E57',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495E57',
  },
  selectedTabText: {
    color: 'white',
  },
});