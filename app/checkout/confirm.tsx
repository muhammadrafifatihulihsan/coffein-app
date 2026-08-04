import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
import { Colors } from "../../constants/colors";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";

export default function ConfirmScreen() {
	const router = useRouter();
	const cart = useCartStore();
	const [customerName, setCustomerName] = useState("");

	const handleConfirm = () => {
		const name = customerName.trim() || "Umum";
		router.push({
			pathname: "/checkout/payment-method",
			params: { customerName: name },
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Konfirmasi Pesanan",
					headerStyle: { backgroundColor: Colors.bg },
					headerTintColor: Colors.text,
					headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
				}}
			/>

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					{/* Nama Pelanggan */}
					<Text style={styles.sectionTitle}>Atas Nama</Text>
					<NeumorphicCard inset style={styles.inputCard}>
						<TextInput
							style={styles.input}
							placeholder="Masukkan nama pelanggan..."
							placeholderTextColor={Colors.textMuted}
							value={customerName}
							onChangeText={setCustomerName}
							autoFocus
						/>
					</NeumorphicCard>

					{/* Ringkasan Pesanan */}
					<Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
					<NeumorphicCard style={styles.summaryCard}>
						{cart.items.map((item, i) => (
							<View
								key={item.productId}
								style={[
									styles.itemRow,
									i < cart.items.length - 1 && styles.itemRowBorder,
								]}
							>
								<View style={styles.itemLeft}>
									<Text style={styles.itemName}>{item.name}</Text>
									<Text style={styles.itemQty}>×{item.qty}</Text>
								</View>
								<Text style={styles.itemPrice}>
									{formatCurrency(item.price * item.qty)}
								</Text>
							</View>
						))}

						{/* Total */}
						<View style={styles.totalRow}>
							<Text style={styles.totalLabel}>Total</Text>
							<Text style={styles.totalAmount}>
								{formatCurrency(cart.total)}
							</Text>
						</View>
					</NeumorphicCard>

					{/* Konfirmasi */}
					<NeumorphicButton
						title="Konfirmasi Pesanan"
						onPress={handleConfirm}
						variant="primary"
						size="lg"
						style={styles.confirmBtn}
					/>

					<NeumorphicButton
						title="Batalkan"
						onPress={() => router.back()}
						variant="default"
						size="md"
						style={styles.cancelBtn}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
	},
	flex: {
		flex: 1,
	},
	content: {
		padding: 24,
		paddingBottom: 40,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 10,
		marginTop: 4,
		fontFamily: "Poppins_700Bold",
	},
	inputCard: {
		paddingHorizontal: 16,
		paddingVertical: 14,
		marginBottom: 24,
	},
	input: {
		fontSize: 15,
		color: Colors.text,
		fontFamily: "Poppins_500Medium",
		padding: 0,
	},
	summaryCard: {
		padding: 16,
		marginBottom: 28,
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
	},
	itemRowBorder: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(138, 124, 108, 0.15)",
	},
	itemLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flex: 1,
	},
	itemName: {
		fontSize: 14,
		color: Colors.text,
		fontFamily: "Poppins_500Medium",
		flexShrink: 1,
	},
	itemQty: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_400Regular",
	},
	itemPrice: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.textMuted,
		fontFamily: "Poppins_600SemiBold",
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 14,
		marginTop: 6,
		borderTopWidth: 1,
		borderTopColor: "rgba(138, 124, 108, 0.25)",
		borderStyle: "dashed",
	},
	totalLabel: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	totalAmount: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.accent,
		fontFamily: "Poppins_700Bold",
	},
	confirmBtn: {
		width: "100%",
		marginBottom: 12,
	},
	cancelBtn: {
		width: "100%",
	},
});
