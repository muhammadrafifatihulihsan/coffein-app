import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCartStore } from "../../store/cartStore";
import { useTransactionStore } from "../../store/transactionStore";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentMethodScreen() {
	const router = useRouter();
	const { customerName } = useLocalSearchParams<{ customerName: string }>();
	const cart = useCartStore();
	const addTransaction = useTransactionStore((s) => s.addTransaction);

	useEffect(() => {
		if (cart.items.length === 0) {
			router.back();
		}
	}, []);

	if (cart.items.length === 0) {
		return null;
	}

	const handleCash = () => {
		addTransaction(cart.items, cart.total, "CASH", customerName || "Umum");
		cart.clearCart();
		router.replace("/checkout/success");
	};

	const handleQRIS = () => {
		router.push({
			pathname: "/checkout/qris",
			params: { customerName: customerName || "Umum" },
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Pembayaran",
					headerStyle: { backgroundColor: Colors.bg },
					headerTintColor: Colors.text,
					headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
				}}
			/>

			<View style={styles.content}>
				<View style={styles.overlay}>
					<NeumorphicCard style={styles.sheet}>
						<Text style={styles.title}>Pilih Metode Pembayaran</Text>
						<Text style={styles.totalLabel}>
							Total: {formatCurrency(cart.total)}
						</Text>

						{/* Cash */}
						<Pressable onPress={handleCash}>
							<NeumorphicCard style={styles.payOption} animated={false}>
								<View style={styles.payOptionContent}>
									<View style={styles.iconBox}>
										<Ionicons name="cash" size={22} color={Colors.accent} />
									</View>
									<Text style={styles.payLabel}>Cash</Text>
								</View>
							</NeumorphicCard>
						</Pressable>

						{/* QRIS */}
						<Pressable onPress={handleQRIS}>
							<NeumorphicCard style={styles.payOption} animated={false}>
								<View style={styles.payOptionContent}>
									<View style={styles.iconBox}>
										<Ionicons name="qr-code" size={22} color={Colors.accent} />
									</View>
									<Text style={styles.payLabel}>QRIS</Text>
								</View>
							</NeumorphicCard>
						</Pressable>

						<Pressable onPress={() => router.back()}>
							<Text style={styles.cancelText}>Batalkan</Text>
						</Pressable>
					</NeumorphicCard>
				</View>
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
		backgroundColor: Colors.bg,
		justifyContent: "flex-end",
	},
	overlay: {
		justifyContent: "flex-end",
	},
	sheet: {
		padding: 24,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 0, height: -4 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 8,
		borderTopWidth: 1,
		borderTopColor: "rgba(138, 124, 108, 0.18)",
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
		textAlign: "center",
		marginBottom: 8,
		fontFamily: "Poppins_700Bold",
	},
	totalLabel: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		marginBottom: 20,
		fontFamily: "Poppins_500Medium",
	},
	payOption: {
		marginBottom: 14,
	},
	payOptionContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
		padding: 16,
	},
	iconBox: {
		width: 42,
		height: 42,
		borderRadius: 12,
		backgroundColor: Colors.bg,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
	},
	payLabel: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_600SemiBold",
	},
	cancelText: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		marginTop: 6,
		fontFamily: "Poppins_500Medium",
	},
});
