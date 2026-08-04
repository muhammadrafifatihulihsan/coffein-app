import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TextStyle,
	ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/colors";

type ButtonVariant = "default" | "primary" | "danger" | "success" | "warning";

interface NeumorphicButtonProps {
	title: string;
	onPress: () => void;
	variant?: ButtonVariant;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
	loading?: boolean;
	inset?: boolean;
	size?: "sm" | "md" | "lg";
	icon?: React.ReactNode;
}

export function NeumorphicButton({
	title,
	onPress,
	variant = "default",
	style,
	textStyle,
	disabled = false,
	loading = false,
	inset = false,
	size = "md",
	icon,
}: NeumorphicButtonProps) {
	const isPrimaryLike =
		variant === "primary" ||
		variant === "danger" ||
		variant === "success" ||
		variant === "warning";

	const bgColor = isPrimaryLike
		? variant === "primary"
			? Colors.accent
			: variant === "danger"
				? Colors.danger
				: variant === "success"
					? Colors.success
					: Colors.warning
		: Colors.bg;

	const textColor = isPrimaryLike ? "#FFFFFF" : Colors.text;

	const textSizeStyles: Record<string, TextStyle> = {
		sm: styles.textSM,
		md: styles.textMD,
		lg: styles.textLG,
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
			style={[
				styles.base,
				styles[size],
				!isPrimaryLike && !inset && styles.raised,
				!isPrimaryLike && inset && styles.inset,
				isPrimaryLike && styles.primaryRaised,
				{ backgroundColor: bgColor },
				disabled && styles.disabled,
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={textColor} size="small" />
			) : (
				<>
					{icon}
					<Text
						style={[
							styles.text,
							textSizeStyles[size],
							{ color: textColor },
							icon ? { marginLeft: 8 } : undefined,
							textStyle,
						]}
					>
						{title}
					</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 14,
	},
	sm: {
		paddingHorizontal: 14,
		paddingVertical: 10,
	},
	md: {
		paddingHorizontal: 20,
		paddingVertical: 14,
	},
	lg: {
		paddingHorizontal: 24,
		paddingVertical: 16,
	},
	raised: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 6,
	},
	inset: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: -3, height: -3 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 0,
	},
	primaryRaised: {
		shadowColor: "rgba(78, 53, 36, 0.45)",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 6,
	},
	text: {
		fontWeight: "700",
		fontFamily: "Poppins_700Bold",
		textAlign: "center",
	},
	textSM: {
		fontSize: 12,
	},
	textMD: {
		fontSize: 14,
	},
	textLG: {
		fontSize: 16,
	},
	disabled: {
		opacity: 0.5,
	},
});
