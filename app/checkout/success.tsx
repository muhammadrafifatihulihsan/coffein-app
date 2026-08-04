import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useTransactionStore } from "../../store/transactionStore";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/dateHelpers";
import { Colors } from "../../constants/colors";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";
import { SuccessCheckAnimation } from "../../components/ui/SuccessCheckAnimation";

export default function SuccessScreen() {
	const router = useRouter();
	const transactions = useTransactionStore((s) => s.transactions);
	const lastTx = transactions.length > 0 ? transactions[0] : null;

	if (!lastTx) {
		router.replace("/(tabs)/kasir");
		return null;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<View style={styles.content}>
				<SuccessCheckAnimation show size={96} />

				<View>
					<Text style={styles.title}>Pembayaran Berhasil</Text>
					<Text style={styles.subtitle}>Transaksi tersimpan ke riwayat</Text>
				</View>

				<View style={{ width: "100%" }}>
					<NeumorphicCard inset style={styles.receipt}>
						<View style={styles.receiptCustomerRow}>
							<Text style={styles.receiptCustomerLabel}>Atas Nama</Text>
							<Text style={styles.receiptCustomerName}>
								{lastTx.customerName}
							</Text>
						</View>
						{lastTx.items.map((item, i) => (
							<View key={i} style={styles.receiptRow}>
								<Text style={styles.receiptItem}>
									{item.name} ×{item.qty}
								</Text>
								<Text style={styles.receiptPrice}>
									{formatCurrency(item.price * item.qty)}
								</Text>
							</View>
						))}
						<View style={styles.receiptTotalRow}>
							<Text style={styles.receiptTotalLabel}>
								Total · {lastTx.paymentMethod}
							</Text>
							<Text style={styles.receiptTotalAmount}>
								{formatCurrency(lastTx.total)}
							</Text>
						</View>
						<Text style={styles.receiptDate}>
							{formatDateTime(lastTx.createdAt)}
						</Text>
					</NeumorphicCard>

					<NeumorphicButton
						title="Transaksi Baru"
						onPress={() => router.replace("/(tabs)/kasir")}
						variant="primary"
						size="lg"
						style={styles.newBtn}
					/>
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
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		color: Colors.text,
		marginTop: 20,
		marginBottom: 6,
		fontFamily: "Poppins_700Bold",
	},
	subtitle: {
		fontSize: 13,
		color: Colors.textMuted,
		marginBottom: 24,
		fontFamily: "Poppins_400Regular",
	},
	receipt: {
		width: "100%",
		padding: 16,
		marginBottom: 20,
	},
	receiptCustomerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 10,
		marginBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(138, 124, 108, 0.25)",
	},
	receiptCustomerLabel: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	receiptCustomerName: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	receiptRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	receiptItem: {
		fontSize: 13,
		color: Colors.text,
		fontFamily: "Poppins_500Medium",
	},
	receiptPrice: {
		fontSize: 13,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	receiptTotalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		marginTop: 8,
		borderTopWidth: 1,
		borderTopColor: "rgba(138, 124, 108, 0.25)",
		borderStyle: "dashed",
	},
	receiptTotalLabel: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	receiptTotalAmount: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.accent,
		fontFamily: "Poppins_700Bold",
	},
	receiptDate: {
		fontSize: 11,
		color: Colors.textMuted,
		marginTop: 10,
		textAlign: "center",
		fontFamily: "Poppins_400Regular",
	},
	newBtn: {
		width: "100%",
	},
});
