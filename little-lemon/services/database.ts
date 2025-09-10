import * as SQLite from 'expo-sqlite';
import { MenuItemData } from '../constants';
import { getData, storeData, KEYS } from '../storage';

// Open database synchronously (new API)
const db = SQLite.openDatabaseSync('littlelemon.db');

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image TEXT,
        category TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const getMenuItems = async (): Promise<MenuItemData[]> => {
  try {
    const result = await db.getAllAsync('SELECT * FROM menu_items ORDER BY name');
    return result as MenuItemData[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const getMenuItemsByCategory = async (category: string): Promise<MenuItemData[]> => {
  try {
    const result = await db.getAllAsync(
      'SELECT * FROM menu_items WHERE category = ? ORDER BY name',
      [category]
    );
    return result as MenuItemData[];
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    return [];
  }
};

export const insertMenuItem = async (item: Omit<MenuItemData, 'id'>): Promise<number> => {
  try {
    const result = await db.runAsync(
      'INSERT INTO menu_items (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
      [item.name, item.description, item.price, item.image, item.category]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting menu item:', error);
    throw error;
  }
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM menu_items WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const result = await db.getAllAsync('SELECT DISTINCT category FROM menu_items ORDER BY category');
    return result.map((row: any) => row.category);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['Starters', 'Mains', 'Desserts', 'Drinks']; // fallback
  }
};

// Updated seed function with AsyncStorage check
export const seedDatabase = async (): Promise<void> => {
  try {
    // Check AsyncStorage first to see if we've already seeded
    const hasSeeded = await getData(KEYS.databaseSeeded);
    if (hasSeeded === 'true') {
      console.log('Database already seeded (AsyncStorage check)');
      return;
    }

    // Double check: look at database directly too
    const existingItems = await db.getAllAsync('SELECT COUNT(*) as count FROM menu_items');
    if ((existingItems[0] as any).count > 0) {
      console.log('Database already has data, marking as seeded');
      await storeData(KEYS.databaseSeeded, 'true');
      return;
    }

    console.log('Seeding database with initial data...');

    const sampleMenuItems = [
      {
        name: 'Greek Salad',
        description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
        category: 'Starters'
      },
      {
        name: 'Bruschetta',
        description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=200&fit=crop',
        category: 'Starters'
      },
      {
        name: 'Grilled Fish',
        description: 'Barbequed catch of the day, with red onion, crisp capers, chive creme fraiche.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
        category: 'Mains'
      },
      {
        name: 'Pasta',
        description: 'Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & salted ricotta cheese.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
        category: 'Mains'
      },
      {
        name: 'Lemon Dessert',
        description: 'Light and fluffy traditional homemade Italian Lemon and ricotta cake.',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop',
        category: 'Desserts'
      }
    ];

    for (const item of sampleMenuItems) {
      await insertMenuItem(item);
    }

    // Mark as seeded in AsyncStorage
    await storeData(KEYS.databaseSeeded, 'true');
    console.log('Database seeded successfully and marked in AsyncStorage');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Optional: Reset function for development/testing
export const resetDatabase = async (): Promise<void> => {
  try {
    await db.execAsync('DELETE FROM menu_items');
    await db.execAsync('DELETE FROM categories');
    await storeData(KEYS.databaseSeeded, 'false');
    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};