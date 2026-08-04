import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../constants/colors";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "accent";

interface NeumorphicBadgeProps {
	label: string;
	variant?: BadgeVariant;
	style?: StyleProp<ViewStyle>;
	size?: "sm" | "md";
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
	default: { bg: Colors.bg, text: Colors.textMuted },
	success: { bg: Colors.success, text: "#FFF" },
	warning: { bg: Colors.warning, text: "#FFF" },
	danger: { bg: Colors.danger, text: "#FFF" },
	accent: { bg: Colors.accent, text: "#FFF" },
};

export function NeumorphicBadge({
	label,
	variant = "default",
	style,
	size = "sm",
}: NeumorphicBadgeProps) {
	const colors = variantColors[variant];

	return (
		<View
			style={[styles.base, styles[size], { backgroundColor: colors.bg }, style]}
		>
			<Text
				style={[
					styles.text,
					styles[`text${size.toUpperCase()}`],
					{ color: colors.text },
				]}
			>
				{label}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		borderRadius: 20,
		alignSelf: "flex-start",
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 3,
	},
	sm: {
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	md: {
		paddingHorizontal: 14,
		paddingVertical: 6,
	},
	text: {
		fontWeight: "600",
		textAlign: "center",
	},
	textSM: {
		fontSize: 11,
	},
	textMD: {
		fontSize: 13,
	},
});
