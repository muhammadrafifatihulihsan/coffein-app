import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NeumorphicButton } from "../ui/NeumorphicButton";
import { ProductCategory } from "../../types";

interface CategoryTabsProps {
	selected: ProductCategory | "Semua";
	onSelect: (cat: ProductCategory | "Semua") => void;
}

const categories: (ProductCategory | "Semua")[] = [
	"Semua",
	"Kopi",
	"Non-Kopi",
	"Snack",
];

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{categories.map((cat) => (
				<NeumorphicButton
					key={cat}
					title={cat}
					onPress={() => onSelect(cat)}
					size="sm"
					inset={selected === cat}
					variant={selected === cat ? "primary" : "default"}
				/>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		paddingHorizontal: 18,
		paddingVertical: 12,
	},
});
