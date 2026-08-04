import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductStore } from "../../store/productStore";
import { SearchFilterBar } from "../../components/kasir/SearchFilterBar";
import { MenuGridItem } from "../../components/kasir/MenuGridItem";
import { CartPanel } from "../../components/kasir/CartPanel";
import { useCartStore } from "../../store/cartStore";
import { Colors } from "../../constants/colors";
import { ProductCategory } from "../../types";
import { EmptyState } from "../../components/ui/EmptyState";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 2;
const ITEM_GAP = 12;
const ITEM_WIDTH = (width - 18 * 2 - ITEM_GAP) / NUM_COLUMNS;

export default function KasirScreen() {
	const [selectedCategory, setSelectedCategory] = useState<
		ProductCategory | "Semua"
	>("Semua");
	const [searchQuery, setSearchQuery] = useState("");

	const products = useProductStore().products;
	const cart = useCartStore();

	const filteredProducts = products
		.filter((p) => p.isActive)
		.filter(
			(p) => selectedCategory === "Semua" || p.category === selectedCategory,
		)
		.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

	const isInCart = (productId: string) =>
		cart.items.some((item) => item.productId === productId);

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.greeting}>SELAMAT DATANG</Text>
				<Text style={styles.title}>Kasir · Coffein</Text>
			</View>

			{/* Search Bar + Filter Pills */}
			<SearchFilterBar
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				selectedCategory={selectedCategory}
				onCategorySelect={setSelectedCategory}
			/>

			{/* Menu Grid */}
			{filteredProducts.length === 0 ? (
				<EmptyState
					title="Tidak ada menu"
					subtitle="Tambahkan menu di halaman Manajemen Menu"
				/>
			) : (
				<FlatList
					data={filteredProducts}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<MenuGridItem
							product={item}
							onPress={() => cart.addItem(item)}
							isSelected={isInCart(item.id)}
							index={index}
						/>
					)}
					numColumns={NUM_COLUMNS}
					contentContainerStyle={styles.grid}
					columnWrapperStyle={{ gap: ITEM_GAP }}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{/* Cart Panel */}
			<View style={styles.cartContainer}>
				<CartPanel />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
	},
	header: {
		paddingHorizontal: 18,
		paddingTop: 20,
		paddingBottom: 4,
	},
	greeting: {
		fontSize: 11,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
		letterSpacing: 2,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.text,
		marginTop: 2,
		fontFamily: "Poppins_700Bold",
	},
	grid: {
		paddingHorizontal: 18,
		paddingBottom: 12,
		gap: ITEM_GAP,
	},
	cartContainer: {
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
});
