import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Colors } from "../constants/colors";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" color={Colors.accent} />
			</View>
		);
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Colors.bg },
				animation: "fade",
			}}
		/>
	);
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.bg,
	},
});
