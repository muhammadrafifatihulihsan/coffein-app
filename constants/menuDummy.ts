import { Product } from "../types";
import { generateId } from "../utils/generateId";

export const MENU_DUMMY: Product[] = [
	{
		id: generateId(),
		name: "Kopi Susu Gula Aren",
		price: 22000,
		category: "Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 7,
	},
	{
		id: generateId(),
		name: "Es Kopi Susu",
		price: 20000,
		category: "Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 6,
	},
	{
		id: generateId(),
		name: "Americano",
		price: 18000,
		category: "Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 5,
	},
	{
		id: generateId(),
		name: "Cappuccino",
		price: 25000,
		category: "Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 5,
	},
	{
		id: generateId(),
		name: "Choco Latte",
		price: 24000,
		category: "Non-Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 4,
	},
	{
		id: generateId(),
		name: "Matcha Latte",
		price: 26000,
		category: "Non-Kopi",
		isActive: true,
		createdAt: Date.now() - 86400000 * 3,
	},
	{
		id: generateId(),
		name: "Croissant",
		price: 18000,
		category: "Snack",
		isActive: true,
		createdAt: Date.now() - 86400000 * 2,
	},
	{
		id: generateId(),
		name: "Cookies",
		price: 12000,
		category: "Snack",
		isActive: true,
		createdAt: Date.now() - 86400000,
	},
];
