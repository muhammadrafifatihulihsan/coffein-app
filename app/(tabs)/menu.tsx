import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useProductStore } from "../../store/productStore";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicToggle } from "../../components/ui/NeumorphicToggle";
import { NeumorphicBadge } from "../../components/ui/NeumorphicBadge";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../types";

export default function MenuScreen() {
	const router = useRouter();
	const products = useProductStore().products;
	const toggleActive = useProductStore((s) => s.toggleActive);
	const deleteProduct = useProductStore((s) => s.deleteProduct);

	const renderItem = ({ item }: { item: Product }) => (
		<Pressable
			onPress={() => router.push(`/menu/edit/${item.id}`)}
			style={styles.itemRow}
		>
			<NeumorphicCard animated={false} style={styles.itemCard}>
				<View style={styles.itemContent}>
					<View style={styles.iconBox}>
						<Ionicons name="cafe" size={18} color={Colors.accent} />
					</View>
					<View style={styles.itemInfo}>
						<Text style={styles.itemName} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.itemMeta}>
							{formatCurrency(item.price)} · {item.category}
						</Text>
					</View>
					<NeumorphicToggle
						value={item.isActive}
						onToggle={() => toggleActive(item.id)}
					/>
				</View>
			</NeumorphicCard>
		</Pressable>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Manajemen Menu</Text>
				<Text style={styles.subtitle}>{products.length} menu terdaftar</Text>
			</View>

			{products.length === 0 ? (
				<EmptyState
					title="Belum ada menu"
					subtitle="Tap tombol + untuk menambah menu baru"
				/>
			) : (
				<FlatList
					data={products}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.list}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{/* FAB */}
			<Pressable style={styles.fab} onPress={() => router.push("/menu/add")}>
				<View style={styles.fabShadowLight} pointerEvents="none" />
				<View style={styles.fabShadowDark} pointerEvents="none" />
				<View style={styles.fabInner}>
					<Text style={styles.fabText}>+</Text>
				</View>
			</Pressable>
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
		paddingBottom: 12,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	subtitle: {
		fontSize: 13,
		color: Colors.textMuted,
		marginTop: 4,
		fontFamily: "Poppins_400Regular",
	},
	list: {
		paddingHorizontal: 18,
		paddingBottom: 80,
		gap: 10,
	},
	itemRow: {
		marginBottom: 0,
	},
	itemCard: {
		padding: 0,
	},
	itemContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		padding: 14,
	},
	iconBox: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: Colors.bg,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 2,
	},
	itemInfo: {
		flex: 1,
	},
	itemName: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_600SemiBold",
	},
	itemMeta: {
		fontSize: 11,
		color: Colors.textMuted,
		marginTop: 2,
		fontFamily: "Poppins_400Regular",
	},
	fab: {
		position: "absolute",
		bottom: 24,
		right: 24,
		width: 56,
		height: 56,
		overflow: "visible",
	},
	fabShadowLight: {
		position: "absolute",
		top: -4,
		left: -4,
		right: -4,
		bottom: -4,
		backgroundColor: Colors.accent,
		borderRadius: 9999,
		shadowColor: "#FFFFFF",
		shadowOffset: { width: -4, height: -4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 0,
	},
	fabShadowDark: {
		position: "absolute",
		top: -4,
		left: -4,
		right: -4,
		bottom: -4,
		backgroundColor: Colors.accent,
		borderRadius: 9999,
		shadowColor: "rgba(78, 53, 36, 0.5)",
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 8,
	},
	fabInner: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.accent,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
	fabText: {
		fontSize: 26,
		color: "#FFFFFF",
		fontWeight: "700",
		lineHeight: 28,
	},
});
