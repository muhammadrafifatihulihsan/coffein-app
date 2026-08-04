import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	ScrollView,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ProductCategory } from "../../types";

interface SearchFilterBarProps {
	searchQuery: string;
	onSearchChange: (text: string) => void;
	selectedCategory: ProductCategory | "Semua";
	onCategorySelect: (cat: ProductCategory | "Semua") => void;
}

const categories: (ProductCategory | "Semua")[] = [
	"Semua",
	"Kopi",
	"Non-Kopi",
	"Snack",
];

export function SearchFilterBar({
	searchQuery,
	onSearchChange,
	selectedCategory,
	onCategorySelect,
}: SearchFilterBarProps) {
	return (
		<View style={styles.wrapper}>
			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<Ionicons
					name="search"
					size={18}
					color={Colors.textMuted}
					style={styles.searchIcon}
				/>
				<TextInput
					placeholder="Cari menu..."
					placeholderTextColor={Colors.textMuted}
					value={searchQuery}
					onChangeText={onSearchChange}
					style={styles.searchInput}
				/>
				{searchQuery.length > 0 && (
					<Pressable onPress={() => onSearchChange("")} style={styles.clearBtn}>
						<Ionicons name="close-circle" size={18} color={Colors.textMuted} />
					</Pressable>
				)}
			</View>

			{/* Filter Pills */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.pillsContainer}
			>
				{categories.map((cat) => {
					const isActive = selectedCategory === cat;
					return (
						<Pressable
							key={cat}
							onPress={() => onCategorySelect(cat)}
							style={[styles.pill, isActive && styles.pillActive]}
						>
							<View
								style={isActive ? styles.pillShadowActive : styles.pillShadow}
							>
								<Text
									style={[styles.pillText, isActive && styles.pillTextActive]}
								>
									{cat}
								</Text>
							</View>
						</Pressable>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 18,
		paddingTop: 8,
		paddingBottom: 4,
		gap: 10,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.bg,
		borderRadius: 14,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: -3, height: -3 },
		shadowOpacity: 0.25,
		shadowRadius: 6,
		elevation: 0,
	},
	searchIcon: {
		marginLeft: 14,
	},
	searchInput: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 12,
		fontSize: 14,
		color: Colors.text,
		fontFamily: "Poppins_400Regular",
	},
	clearBtn: {
		padding: 8,
		marginRight: 6,
	},
	pillsContainer: {
		gap: 8,
	},
	pill: {
		borderRadius: 20,
		overflow: "visible",
	},
	pillActive: {
		backgroundColor: Colors.accent,
	},
	pillShadow: {
		borderRadius: 20,
		paddingHorizontal: 18,
		paddingVertical: 8,
		backgroundColor: Colors.bg,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 2,
	},
	pillShadowActive: {
		borderRadius: 20,
		paddingHorizontal: 18,
		paddingVertical: 8,
	},
	pillText: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.textMuted,
		fontFamily: "Poppins_600SemiBold",
	},
	pillTextActive: {
		color: "#FFFFFF",
	},
});
