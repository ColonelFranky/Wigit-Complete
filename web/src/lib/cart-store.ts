import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: 'wigit' | 'tshirt';
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Mock cart items for testing
const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Gaming Wigit Pro",
    price: 29.99,
    quantity: 2,
    type: "wigit",
    image: "https://placehold.co/200x200?text=Gaming+Wigit+Pro"
  },
  {
    id: 2,
    name: "Office Decor Wigit",
    price: 24.99,
    quantity: 1,
    type: "wigit",
    image: "https://placehold.co/200x200?text=Office+Decor+Wigit"
  },
  {
    id: 101,
    name: "Anime T-Shirt Collection",
    price: 19.99,
    quantity: 3,
    type: "tshirt",
    image: "https://placehold.co/200x200?text=Anime+TShirt"
  },
  {
    id: 102,
    name: "Geek Culture T-Shirt",
    price: 22.99,
    quantity: 1,
    type: "tshirt",
    image: "https://placehold.co/200x200?text=Geek+Culture+TShirt"
  }
];

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: mockCartItems, // Initialize with mock data
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }]
          };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'wigit-cart',
    }
  )
); 