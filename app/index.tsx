import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Animated, Image } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function SplashScreen() {
	const router = useRouter();

	const fadeLogo = useRef(new Animated.Value(0)).current;
	const fadeTagline = useRef(new Animated.Value(0)).current;
	const fadeOut = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		// Animasi fade-in logo lalu tagline
		Animated.sequence([
			Animated.timing(fadeLogo, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(fadeTagline, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
			}),
		]).start();

		// Setelah 2.5 detik total, fade out & redirect
		const timeout = setTimeout(() => {
			Animated.timing(fadeOut, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}).start(() => {
				router.replace("/(tabs)/kasir");
			});
		}, 2500);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<Animated.View style={[styles.container, { opacity: fadeOut }]}>
			{/* Coffee Icon Logo */}
			<Animated.View style={[styles.logoWrapper, { opacity: fadeLogo }]}>
				<Image
					source={require("../assets/coffein-icon.jpeg")}
					style={styles.logoImage}
					resizeMode="contain"
				/>
			</Animated.View>

			{/* Tagline */}
			<Animated.View style={{ opacity: fadeTagline }}>
				<Text style={styles.tagline}>Your Daily Brew</Text>
			</Animated.View>
		</Animated.View>
	);
}

const LOGO_SIZE = 180;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f9f0e7",
		justifyContent: "center",
		alignItems: "center",
	},
	logoWrapper: {
		width: LOGO_SIZE,
		height: LOGO_SIZE,
		marginBottom: 8,
	},
	logoImage: {
		width: "100%",
		height: "100%",
		borderRadius: LOGO_SIZE / 2,
	},
	tagline: {
		fontSize: 14,
		color: Colors.textMuted,
		fontFamily: "Poppins_400Regular",
		letterSpacing: 3,
		textAlign: "center",
		marginTop: 4,
	},
});
