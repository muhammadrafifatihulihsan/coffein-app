import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, ProductCategory } from "../types";
import { generateId } from "../utils/generateId";
import { MENU_DUMMY } from "../constants/menuDummy";

interface ProductStore {
	products: Product[];
	addProduct: (
		name: string,
		price: number,
		category: ProductCategory,
		imageUri?: string,
	) => void;
	editProduct: (id: string, updates: Partial<Product>) => void;
	deleteProduct: (id: string) => void;
	toggleActive: (id: string) => void;
	getActiveProducts: () => Product[];
	getProductById: (id: string) => Product | undefined;
	resetToDummy: () => void;
}

export const useProductStore = create<ProductStore>()(
	persist(
		(set, get) => ({
			products: MENU_DUMMY,

			addProduct: (name, price, category, imageUri) => {
				const newProduct: Product = {
					id: generateId(),
					name,
					price,
					category,
					imageUri,
					isActive: true,
					createdAt: Date.now(),
				};
				set((state) => ({ products: [...state.products, newProduct] }));
			},

			editProduct: (id, updates) => {
				set((state) => ({
					products: state.products.map((p) =>
						p.id === id ? { ...p, ...updates } : p,
					),
				}));
			},

			deleteProduct: (id) => {
				set((state) => ({
					products: state.products.filter((p) => p.id !== id),
				}));
			},

			toggleActive: (id) => {
				set((state) => ({
					products: state.products.map((p) =>
						p.id === id ? { ...p, isActive: !p.isActive } : p,
					),
				}));
			},

			getActiveProducts: () => {
				return get().products.filter((p) => p.isActive);
			},

			getProductById: (id) => {
				return get().products.find((p) => p.id === id);
			},

			resetToDummy: () => {
				set({ products: MENU_DUMMY });
			},
		}),
		{
			name: "coffein-products",
			storage: createJSONStorage(() => AsyncStorage),
			version: 1,
		},
	),
);
