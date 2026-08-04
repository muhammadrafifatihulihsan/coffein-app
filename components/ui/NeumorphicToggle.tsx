import React from "react";
import { Pressable, StyleSheet, Animated } from "react-native";
import { Colors } from "../../constants/colors";

interface NeumorphicToggleProps {
	value: boolean;
	onToggle: (val: boolean) => void;
}

export function NeumorphicToggle({ value, onToggle }: NeumorphicToggleProps) {
	const offset = React.useRef(new Animated.Value(value ? 1 : 0)).current;

	React.useEffect(() => {
		Animated.spring(offset, {
			toValue: value ? 1 : 0,
			useNativeDriver: false,
			friction: 6,
		}).start();
	}, [value]);

	const knobLeft = offset.interpolate({
		inputRange: [0, 1],
		outputRange: [3, 23],
	});

	return (
		<Pressable
			onPress={() => onToggle(!value)}
			style={[
				styles.track,
				{ backgroundColor: value ? Colors.accent : Colors.bg },
				value ? styles.inset : styles.raised,
			]}
		>
			<Animated.View
				style={[styles.knob, { left: knobLeft }, !value && styles.knobRaised]}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	track: {
		width: 48,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		paddingHorizontal: 2,
	},
	raised: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 3,
	},
	inset: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: -2, height: -2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 0,
	},
	knob: {
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: "#FFFFFF",
		position: "absolute",
		top: 3,
	},
	knobRaised: {
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.35,
		shadowRadius: 3,
		elevation: 4,
	},
});
