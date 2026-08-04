import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: Colors.bg,
					borderTopWidth: 0,
					elevation: 0,
					height: 60,
					paddingBottom: 0,
					paddingTop: 0,
					marginTop: -3,
					shadowColor: Colors.shadowDark,
					shadowOffset: { width: 0, height: -4 },
					shadowOpacity: 0.3,
					shadowRadius: 8,
				},
				tabBarActiveTintColor: Colors.accent,
				tabBarInactiveTintColor: Colors.textMuted,
				tabBarLabelStyle: {
					fontFamily: "Poppins_600SemiBold",
					fontSize: 11,
				},
			}}
		>
			<Tabs.Screen
				name="kasir"
				options={{
					title: "Kasir",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="cash-register"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="menu"
				options={{
					title: "Menu",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="cafe" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="riwayat"
				options={{
					title: "Riwayat",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="time" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="laporan"
				options={{
					title: "Laporan",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="bar-chart" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
