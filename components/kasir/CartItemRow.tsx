import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NeumorphicButton } from "../ui/NeumorphicButton";
import { CartItem } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";

interface CartItemRowProps {
	item: CartItem;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}

export function CartItemRow({
	item,
	onIncrease,
	onDecrease,
	onRemove,
}: CartItemRowProps) {
	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<Text style={styles.name} numberOfLines={1}>
					{item.name}
				</Text>
				<Text style={styles.subtotal}>
					{formatCurrency(item.price * item.qty)}
				</Text>
			</View>
			<View style={styles.stepper}>
				<NeumorphicButton
					title="−"
					onPress={item.qty === 1 ? onRemove : onDecrease}
					size="sm"
					variant={item.qty === 1 ? "danger" : "default"}
				/>
				<Text style={styles.qty}>{item.qty}</Text>
				<NeumorphicButton title="+" onPress={onIncrease} size="sm" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
	},
	info: {
		flex: 1,
		marginRight: 12,
	},
	name: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		fontFamily: "Poppins_600SemiBold",
	},
	subtotal: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 2,
		fontFamily: "Poppins_500Medium",
	},
	stepper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	qty: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
		minWidth: 20,
		textAlign: "center",
		fontFamily: "Poppins_700Bold",
	},
});
