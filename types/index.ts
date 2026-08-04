// Kategori produk
export type ProductCategory = "Kopi" | "Non-Kopi" | "Snack";

// Metode pembayaran
export type PaymentMethod = "CASH" | "QRIS";

// Data produk
export interface Product {
	id: string;
	name: string;
	price: number;
	category: ProductCategory;
	imageUri?: string;
	isActive: boolean;
	createdAt: number;
}

// Item dalam keranjang (cart)
export interface CartItem {
	productId: string;
	name: string;
	price: number;
	qty: number;
}

// Data transaksi
export interface Transaction {
	id: string;
	customerName: string;
	items: CartItem[];
	total: number;
	paymentMethod: PaymentMethod;
	createdAt: number;
}

// Filter tanggal untuk riwayat
export type DateFilter = "all" | "today" | "week" | "month";

// Data ringkasan dashboard
export interface SalesSummary {
	today: number;
	thisMonth: number;
	allTime: number;
}

// Item top menu
export interface TopMenuItem {
	productId: string;
	name: string;
	count: number;
}

// Breakdown pembayaran
export interface PaymentBreakdown {
	cash: number;
	qris: number;
	cashPercentage: number;
	qrisPercentage: number;
}
