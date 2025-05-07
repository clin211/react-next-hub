import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];

    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;

    // 计算值
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => set((state) => {
                const existingItem = state.items.find(item => item.id === newItem.id);

                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                }

                return {
                    items: [...state.items, { ...newItem, quantity: 1 }]
                };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            })),

            clearCart: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () => get().items.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            ),
        }),
        {
            name: 'shopping-cart', // 存储键名
            storage: createJSONStorage(() => localStorage), // 使用 localStorage
            partialize: (state) => ({ items: state.items }), // 只持久化某些字段

            // 版本控制和迁移
            version: 1,
            onRehydrateStorage: (state) => {
                console.log('状态已从存储还原', state);
                return (state, error) => {
                    if (error) {
                        console.error('恢复状态时出错:', error);
                    }
                };
            },
        }
    )
);