import { create } from "zustand";
import { CartItem, Product } from "../types";

interface CartStore {
	items: CartItem[];
	total: number;
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	increaseQty: (productId: string) => void;
	decreaseQty: (productId: string) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartStore>()((set, get) => ({
	items: [],
	total: 0,

	addItem: (product: Product) => {
		set((state) => {
			const existing = state.items.find((i) => i.productId === product.id);
			let newItems: CartItem[];

			if (existing) {
				newItems = state.items.map((i) =>
					i.productId === product.id ? { ...i, qty: i.qty + 1 } : i,
				);
			} else {
				newItems = [
					...state.items,
					{
						productId: product.id,
						name: product.name,
						price: product.price,
						qty: 1,
					},
				];
			}

			const total = newItems.reduce(
				(sum, item) => sum + item.price * item.qty,
				0,
			);

			return { items: newItems, total };
		});
	},

	removeItem: (productId: string) => {
		set((state) => {
			const newItems = state.items.filter((i) => i.productId !== productId);
			const total = newItems.reduce(
				(sum, item) => sum + item.price * item.qty,
				0,
			);
			return { items: newItems, total };
		});
	},

	increaseQty: (productId: string) => {
		set((state) => {
			const newItems = state.items.map((i) =>
				i.productId === productId ? { ...i, qty: i.qty + 1 } : i,
			);
			const total = newItems.reduce(
				(sum, item) => sum + item.price * item.qty,
				0,
			);
			return { items: newItems, total };
		});
	},

	decreaseQty: (productId: string) => {
		set((state) => {
			const newItems = state.items
				.map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
				.filter((i) => i.qty > 0);

			const total = newItems.reduce(
				(sum, item) => sum + item.price * item.qty,
				0,
			);
			return { items: newItems, total };
		});
	},

	clearCart: () => {
		set({ items: [], total: 0 });
	},
}));
