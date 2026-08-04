import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NeumorphicCard } from "../ui/NeumorphicCard";
import { NeumorphicButton } from "../ui/NeumorphicButton";
import { CartItemRow } from "./CartItemRow";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { useRouter } from "expo-router";

export function CartPanel() {
	const cart = useCartStore();
	const router = useRouter();

	if (cart.items.length === 0) {
		return (
			<NeumorphicCard inset style={styles.emptyCard}>
				<Text style={styles.emptyText}>Keranjang kosong</Text>
				<Text style={styles.emptySub}>Tap menu untuk menambahkan</Text>
			</NeumorphicCard>
		);
	}

	return (
		<NeumorphicCard style={styles.card} animated={false}>
			<ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
				{cart.items.map((item) => (
					<CartItemRow
						key={item.productId}
						item={item}
						onIncrease={() => cart.increaseQty(item.productId)}
						onDecrease={() => cart.decreaseQty(item.productId)}
						onRemove={() => cart.removeItem(item.productId)}
					/>
				))}
			</ScrollView>
			<View style={styles.totalRow}>
				<Text style={styles.totalLabel}>Total</Text>
				<Text style={styles.totalAmount}>{formatCurrency(cart.total)}</Text>
			</View>
			<NeumorphicButton
				title="Bayar"
				onPress={() => router.push("/checkout/confirm")}
				variant="primary"
				size="lg"
				style={styles.payBtn}
			/>
		</NeumorphicCard>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 14,
		maxHeight: 280,
	},
	emptyCard: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingHorizontal: 14,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	emptyText: {
		fontSize: 12,
		fontWeight: "600",
		color: Colors.textMuted,
		fontFamily: "Poppins_600SemiBold",
	},
	emptySub: {
		fontSize: 11,
		color: Colors.textMuted,
		marginTop: 2,
		fontFamily: "Poppins_400Regular",
	},
	list: {
		maxHeight: 160,
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 12,
		marginTop: 8,
		borderTopWidth: 1,
		borderTopColor: "rgba(138, 124, 108, 0.25)",
		borderStyle: "dashed",
	},
	totalLabel: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	totalAmount: {
		fontSize: 20,
		fontWeight: "700",
		color: Colors.accent,
		fontFamily: "Poppins_700Bold",
	},
	payBtn: {
		marginTop: 12,
		width: "100%",
	},
});
