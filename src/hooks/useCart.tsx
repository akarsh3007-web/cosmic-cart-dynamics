import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => Promise<void>;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      createOrder: async () => {
        const { items } = get();
        if (items.length === 0) {
          toast({
            title: "Cart is empty",
            description: "Add items to your cart before placing an order",
            variant: "destructive",
          });
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to place an order",
            variant: "destructive",
          });
          return;
        }

        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 15.00;
        const tax = total * 0.1;
        const finalTotal = total + shipping + tax;

        const { error } = await supabase.from('orders').insert({
          user_id: user.id,
          total: finalTotal,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          status: 'pending',
        });

        if (error) {
          console.error('Order creation error:', error);
          toast({
            title: "Order failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Order placed successfully!",
          description: "Your order has been received and is being processed",
        });
        
        get().clearCart();
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
