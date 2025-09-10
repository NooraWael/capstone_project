export interface MenuItemData {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    displayName: string;
  }
  
  export interface DatabaseSchema {
    menu_items: {
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
      created_at: string;
      updated_at: string;
    };
    categories: {
      id: number;
      name: string;
      display_name: string;
      created_at: string;
    };
  }