import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { NeumorphicCard } from "../ui/NeumorphicCard";
import { Product } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface MenuGridItemProps {
	product: Product;
	onPress: () => void;
	isSelected?: boolean;
	index?: number;
}

const categoryIcons: Record<string, string> = {
	Kopi: "cafe",
	"Non-Kopi": "wine",
	Snack: "fast-food",
};

export function MenuGridItem({
	product,
	onPress,
	isSelected = false,
	index = 0,
}: MenuGridItemProps) {
	return (
		<View style={styles.wrapper}>
			<NeumorphicCard
				onPress={onPress}
				inset={isSelected}
				animated={false}
				style={styles.card}
			>
				<View style={styles.iconContainer}>
					<Ionicons
						name={(categoryIcons[product.category] as any) || "cube"}
						size={20}
						color={Colors.accent}
					/>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.name} numberOfLines={2}>
						{product.name}
					</Text>
					<View style={styles.priceRow}>
						<Text style={styles.price}>{formatCurrency(product.price)}</Text>
						<Ionicons
							name="add-circle"
							size={18}
							color={Colors.accent}
							style={styles.addIcon}
						/>
					</View>
				</View>
			</NeumorphicCard>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	card: {
		padding: 14,
		minHeight: 110,
	},
	iconContainer: {
		width: 38,
		height: 38,
		borderRadius: 12,
		backgroundColor: Colors.bg,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 1,
	},
	name: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 4,
		fontFamily: "Poppins_600SemiBold",
	},
	priceRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	price: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
		flex: 1,
	},
	addIcon: {
		marginLeft: 4,
	},
});
