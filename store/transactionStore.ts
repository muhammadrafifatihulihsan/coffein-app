import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, PaymentMethod, Transaction } from "../types";
import { generateId } from "../utils/generateId";

interface TransactionStore {
	transactions: Transaction[];
	addTransaction: (
		items: CartItem[],
		total: number,
		paymentMethod: PaymentMethod,
		customerName: string,
	) => void;
	clearAllTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
	persist(
		(set) => ({
			transactions: [],

			addTransaction: (items, total, paymentMethod, customerName) => {
				const transaction: Transaction = {
					id: generateId(),
					customerName,
					items: [...items],
					total,
					paymentMethod,
					createdAt: Date.now(),
				};
				set((state) => ({
					transactions: [transaction, ...state.transactions],
				}));
			},

			clearAllTransactions: () => {
				set({ transactions: [] });
			},
		}),
		{
			name: "coffein-transactions",
			storage: createJSONStorage(() => AsyncStorage),
			version: 1,
		},
	),
);
