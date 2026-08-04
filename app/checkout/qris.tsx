import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { useCartStore } from "../../store/cartStore";
import { useTransactionStore } from "../../store/transactionStore";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";

export default function QRISScreen() {
	const router = useRouter();
	const { customerName } = useLocalSearchParams<{ customerName: string }>();
	const cart = useCartStore();
	const addTransaction = useTransactionStore((s) => s.addTransaction);
	const [timer, setTimer] = useState(300); // 5 minutes

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					router.back();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	const qrData = `COFFEIN-QRIS-${Date.now()}`;

	const handleSimulatePayment = () => {
		addTransaction(cart.items, cart.total, "QRIS", customerName || "Umum");
		cart.clearCart();
		router.replace("/checkout/success");
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "QRIS",
					headerStyle: { backgroundColor: Colors.bg },
					headerTintColor: Colors.text,
					headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
				}}
			/>

			<View style={styles.content}>
				<Text style={styles.totalLabel}>TOTAL PEMBAYARAN</Text>
				<Text style={styles.totalAmount}>{formatCurrency(cart.total)}</Text>

				<NeumorphicCard style={styles.qrCard}>
					<QRCode
						value={qrData}
						size={150}
						backgroundColor={Colors.bg}
						color={Colors.accent}
					/>
				</NeumorphicCard>

				<View style={styles.demoBadge}>
					<Text style={styles.demoText}>MODE DEMO / TESTING</Text>
				</View>

				<Text style={styles.timerText}>Kedaluwarsa dalam {timeStr}</Text>

				<NeumorphicButton
					title="Konfirmasi Pembayaran"
					onPress={handleSimulatePayment}
					variant="warning"
					size="lg"
					style={styles.simBtn}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
	},
	content: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 40,
	},
	totalLabel: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
		marginBottom: 4,
	},
	totalAmount: {
		fontSize: 26,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 24,
		fontFamily: "Poppins_700Bold",
	},
	qrCard: {
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	demoBadge: {
		backgroundColor: "rgba(201, 141, 75, 0.15)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		marginBottom: 18,
	},
	demoText: {
		fontSize: 10,
		fontWeight: "700",
		color: Colors.warning,
		letterSpacing: 1,
		fontFamily: "Poppins_600SemiBold",
	},
	timerText: {
		fontSize: 13,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
		marginBottom: 24,
	},
	simBtn: {
		width: "100%",
	},
});
