import React from "react";
import {
	TextInput,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TextInputProps,
	View,
	Text,
} from "react-native";
import { Colors } from "../../constants/colors";

interface NeumorphicInputProps extends TextInputProps {
	label?: string;
	containerStyle?: StyleProp<ViewStyle>;
}

export function NeumorphicInput({
	label,
	containerStyle,
	style,
	...props
}: NeumorphicInputProps) {
	return (
		<View style={[containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				placeholderTextColor={Colors.textMuted}
				{...props}
				style={[styles.input, style]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		marginBottom: 8,
		marginLeft: 4,
	},
	input: {
		backgroundColor: Colors.bg,
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 15,
		color: Colors.text,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: -3, height: -3 },
		shadowOpacity: 0.25,
		shadowRadius: 6,
		elevation: 0,
		borderWidth: 0,
	},
});
