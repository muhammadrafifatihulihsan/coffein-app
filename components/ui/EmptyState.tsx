import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { NeumorphicCard } from "./NeumorphicCard";

interface EmptyStateProps {
	icon?: string;
	title: string;
	subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<NeumorphicCard style={styles.card}>
				<Text style={styles.icon}>☕</Text>
				<Text style={styles.title}>{title}</Text>
				{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			</NeumorphicCard>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	card: {
		width: "100%",
		alignItems: "center",
		paddingVertical: 40,
		paddingHorizontal: 24,
	},
	icon: {
		fontSize: 48,
		marginBottom: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		lineHeight: 20,
	},
});
