import React from "react";
import {
	View,
	StyleSheet,
	ViewStyle,
	StyleProp,
	Pressable,
} from "react-native";
import { Colors } from "../../constants/colors";

interface NeumorphicCardProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	inset?: boolean;
	onPress?: () => void;
	animated?: boolean;
}

export function NeumorphicCard({
	children,
	style,
	inset = false,
	onPress,
}: NeumorphicCardProps) {
	const content = (
		<View style={[styles.container, style]}>
			{/* Shadow layer: light top-left */}
			<View
				style={[styles.shadowLight, inset && styles.shadowLightInset]}
				pointerEvents="none"
			/>
			{/* Shadow layer: dark bottom-right */}
			<View
				style={[styles.shadowDark, inset && styles.shadowDarkInset]}
				pointerEvents="none"
			/>
			{/* Content */}
			<View style={[styles.content, inset && styles.contentInset]}>
				{children}
			</View>
		</View>
	);

	if (onPress) {
		return (
			<Pressable
				onPress={onPress}
				style={({ pressed }) => [pressed && styles.pressed]}
			>
				{content}
			</Pressable>
		);
	}

	return content;
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		overflow: "visible",
	},
	shadowLight: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 20,
		shadowColor: "#FFFFFF",
		shadowOffset: { width: -6, height: -6 },
		shadowOpacity: 0.8,
		shadowRadius: 12,
		elevation: 0,
	},
	shadowLightInset: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.4,
	},
	shadowDark: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 20,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 12,
		elevation: 8,
	},
	shadowDarkInset: {
		shadowColor: "#FFFFFF",
		shadowOffset: { width: -4, height: -4 },
		shadowOpacity: 0.8,
	},
	content: {
		backgroundColor: Colors.bg,
		borderRadius: 18,
		zIndex: 1,
	},
	contentInset: {
		backgroundColor: Colors.bg,
	},
	pressed: {
		opacity: 0.95,
		transform: [{ scale: 0.98 }],
	},
});
