import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionStore } from "../../store/transactionStore";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";
import { NeumorphicBadge } from "../../components/ui/NeumorphicBadge";
import { NeumorphicModal } from "../../components/ui/NeumorphicModal";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/dateHelpers";
import { filterTransactions } from "../../utils/dateHelpers";
import { Colors } from "../../constants/colors";
import { DateFilter, Transaction } from "../../types";

export default function RiwayatScreen() {
	const transactions = useTransactionStore((s) => s.transactions);
	const [filter, setFilter] = useState<DateFilter>("all");
	const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

	const filtered = filterTransactions(transactions, filter);

	const filters: { label: string; value: DateFilter }[] = [
		{ label: "Semua", value: "all" },
		{ label: "Harian", value: "today" },
		{ label: "Mingguan", value: "week" },
		{ label: "Bulanan", value: "month" },
	];

	const renderItem = ({ item }: { item: Transaction }) => (
		<Pressable onPress={() => setSelectedTx(item)}>
			<NeumorphicCard animated={false} style={styles.txCard}>
				<View style={styles.txHeader}>
					<View>
						<Text style={styles.txDate}>{formatDateTime(item.createdAt)}</Text>
						<Text style={styles.txItems}>{item.items.length} item</Text>
					</View>
					<View style={styles.txRight}>
						<Text style={styles.txTotal}>{formatCurrency(item.total)}</Text>
						<NeumorphicBadge
							label={item.paymentMethod}
							variant={item.paymentMethod === "CASH" ? "success" : "warning"}
							size="sm"
						/>
					</View>
				</View>
			</NeumorphicCard>
		</Pressable>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Riwayat Transaksi</Text>
			</View>

			{/* Filter tabs */}
			<View style={styles.filterRow}>
				{filters.map((f) => (
					<NeumorphicButton
						key={f.value}
						title={f.label}
						onPress={() => setFilter(f.value)}
						size="sm"
						variant={filter === f.value ? "primary" : "default"}
						inset={filter === f.value}
					/>
				))}
			</View>

			{filtered.length === 0 ? (
				<EmptyState
					title="Belum ada transaksi"
					subtitle="Transaksi akan muncul di sini setelah pembayaran"
				/>
			) : (
				<FlatList
					data={filtered}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.list}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{/* Detail Modal */}
			<NeumorphicModal
				visible={!!selectedTx}
				onClose={() => setSelectedTx(null)}
				title="Detail Transaksi"
			>
				{selectedTx && (
					<View>
						<Text style={styles.detailDate}>
							{formatDateTime(selectedTx.createdAt)}
						</Text>
						{selectedTx.items.map((item, i) => (
							<View key={i} style={styles.detailRow}>
								<Text style={styles.detailItem}>
									{item.name} ×{item.qty}
								</Text>
								<Text style={styles.detailPrice}>
									{formatCurrency(item.price * item.qty)}
								</Text>
							</View>
						))}
						<View style={styles.detailTotalRow}>
							<Text style={styles.detailTotalLabel}>
								Total · {selectedTx.paymentMethod}
							</Text>
							<Text style={styles.detailTotalAmount}>
								{formatCurrency(selectedTx.total)}
							</Text>
						</View>
					</View>
				)}
			</NeumorphicModal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
	},
	header: {
		paddingHorizontal: 18,
		paddingTop: 20,
		paddingBottom: 4,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	filterRow: {
		flexDirection: "row",
		gap: 6,
		paddingHorizontal: 18,
		paddingVertical: 12,
	},
	list: {
		paddingHorizontal: 18,
		paddingBottom: 20,
		gap: 10,
	},
	txCard: {
		padding: 14,
	},
	txHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	txDate: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	txItems: {
		fontSize: 11,
		color: Colors.textMuted,
		marginTop: 2,
		fontFamily: "Poppins_400Regular",
	},
	txRight: {
		alignItems: "flex-end",
		gap: 4,
	},
	txTotal: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.accent,
		fontFamily: "Poppins_700Bold",
	},
	detailDate: {
		fontSize: 12,
		color: Colors.textMuted,
		textAlign: "center",
		marginBottom: 14,
		fontFamily: "Poppins_400Regular",
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	detailItem: {
		fontSize: 13,
		color: Colors.text,
		fontFamily: "Poppins_500Medium",
	},
	detailPrice: {
		fontSize: 13,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	detailTotalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		marginTop: 8,
		borderTopWidth: 1,
		borderTopColor: "rgba(138, 124, 108, 0.25)",
		borderStyle: "dashed",
	},
	detailTotalLabel: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	detailTotalAmount: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.accent,
		fontFamily: "Poppins_700Bold",
	},
});
