import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../constants/colors";

interface SuccessCheckAnimationProps {
	show: boolean;
	size?: number;
}

export function SuccessCheckAnimation({
	show,
	size = 80,
}: SuccessCheckAnimationProps) {
	if (!show) return null;

	return (
		<View
			style={[
				styles.container,
				{ width: size, height: size, borderRadius: size / 2 },
			]}
		>
			<View style={styles.shadowLight} pointerEvents="none" />
			<View style={styles.shadowDark} pointerEvents="none" />
			<View
				style={[
					styles.inner,
					{
						width: size,
						height: size,
						borderRadius: size / 2,
					},
				]}
			>
				<Svg
					width={size * 0.5}
					height={size * 0.5}
					viewBox="0 0 24 24"
					fill="none"
				>
					<Path
						d="M5 13l4 4L19 7"
						stroke={Colors.success}
						strokeWidth={3}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Svg>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignSelf: "center",
	},
	shadowLight: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 9999,
		shadowColor: "#FFFFFF",
		shadowOffset: { width: -6, height: -6 },
		shadowOpacity: 0.8,
		shadowRadius: 12,
		elevation: 0,
	},
	shadowDark: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 9999,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 12,
		elevation: 8,
	},
	inner: {
		backgroundColor: Colors.bg,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1,
	},
});
