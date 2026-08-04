import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Dimensions,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-chart-kit";
import { useTransactionStore } from "../../store/transactionStore";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import { useRouter } from "expo-router";
import { NeumorphicCard } from "../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";
import { NeumorphicModal } from "../../components/ui/NeumorphicModal";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatCurrency } from "../../utils/formatCurrency";
import {
	calculateSalesSummary,
	groupTransactionsByDay,
	getTopMenuItems,
	calculatePaymentBreakdown,
} from "../../utils/dateHelpers";
import { exportExcel } from "../../utils/exportExcel";
import { Colors } from "../../constants/colors";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 60;

export default function LaporanScreen() {
	const transactions = useTransactionStore((s) => s.transactions);

	const summary = useMemo(
		() => calculateSalesSummary(transactions),
		[transactions],
	);
	const chartData = useMemo(
		() => groupTransactionsByDay(transactions, 7),
		[transactions],
	);
	const topMenu = useMemo(
		() => getTopMenuItems(transactions, 5),
		[transactions],
	);
	const breakdown = useMemo(
		() => calculatePaymentBreakdown(transactions),
		[transactions],
	);

	const clearAllTransactions = useTransactionStore(
		(s) => s.clearAllTransactions,
	);
	const resetToDummy = useProductStore((s) => s.resetToDummy);
	const clearCart = useCartStore((s) => s.clearCart);
	const [showResetModal, setShowResetModal] = useState(false);
	const router = useRouter();

	const handleExport = async () => {
		try {
			await exportExcel(transactions);
		} catch {
			// error silent
		}
	};

	const handleConfirmReset = () => {
		setShowResetModal(false);
		clearAllTransactions();
		resetToDummy();
		clearCart();
		router.replace("/(tabs)/laporan");
	};

	if (transactions.length === 0) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Laporan</Text>
				</View>
				<EmptyState
					title="Belum ada data"
					subtitle="Laporan akan muncul setelah ada transaksi"
				/>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Laporan</Text>
				</View>

				{/* Summary Cards */}
				<View style={styles.summaryRow}>
					<NeumorphicCard style={styles.summaryCard}>
						<Text style={styles.summaryLabel}>HARI INI</Text>
						<Text style={styles.summaryValue}>
							{formatCurrency(summary.today)}
						</Text>
					</NeumorphicCard>
					<NeumorphicCard style={styles.summaryCard}>
						<Text style={styles.summaryLabel}>BULAN INI</Text>
						<Text style={styles.summaryValue}>
							{formatCurrency(summary.thisMonth)}
						</Text>
					</NeumorphicCard>
					<NeumorphicCard style={styles.summaryCard}>
						<Text style={styles.summaryLabel}>TOTAL</Text>
						<Text style={styles.summaryValue}>
							{formatCurrency(summary.allTime)}
						</Text>
					</NeumorphicCard>
				</View>

				{/* Chart */}
				<NeumorphicCard style={styles.chartCard}>
					<Text style={styles.sectionLabel}>PENJUALAN 7 HARI TERAKHIR</Text>
					<BarChart
						data={{
							labels: chartData.map((d) => d.date),
							datasets: [{ data: chartData.map((d) => d.total) }],
						}}
						width={CHART_WIDTH}
						height={180}
						yAxisLabel=""
						yAxisSuffix=""
						chartConfig={{
							backgroundColor: Colors.bg,
							backgroundGradientFrom: Colors.bg,
							backgroundGradientTo: Colors.bg,
							decimalPlaces: 0,
							color: (opacity = 1) => `rgba(111, 78, 55, ${opacity})`,
							labelColor: () => Colors.textMuted,
							barPercentage: 0.6,
							propsForLabels: {
								fontSize: 10,
								fontFamily: "Poppins_500Medium",
							},
						}}
						style={styles.chart}
					/>
				</NeumorphicCard>

				{/* Top Menu */}
				{topMenu.length > 0 && (
					<NeumorphicCard style={styles.section}>
						<Text style={styles.sectionLabel}>MENU TERLARIS</Text>
						{topMenu.map((item, i) => (
							<View key={i} style={styles.topRow}>
								<View style={styles.rankBadge}>
									<Text style={styles.rankText}>{i + 1}</Text>
								</View>
								<Text style={styles.topName} numberOfLines={1}>
									{item.name}
								</Text>
								<Text style={styles.topCount}>{item.count}×</Text>
							</View>
						))}
					</NeumorphicCard>
				)}

				{/* Payment Breakdown */}
				<NeumorphicCard style={styles.section}>
					<Text style={styles.sectionLabel}>METODE PEMBAYARAN</Text>
					<View style={styles.breakdownBar}>
						<View
							style={[
								styles.breakdownFill,
								{
									width: `${breakdown.cashPercentage}%`,
									backgroundColor: Colors.accent,
								},
							]}
						/>
						<View
							style={{
								width: `${breakdown.qrisPercentage}%`,
								backgroundColor: Colors.warning,
							}}
						/>
					</View>
					<View style={styles.breakdownLegend}>
						<Text style={styles.legendText}>
							Cash {breakdown.cashPercentage}%
						</Text>
						<Text style={styles.legendText}>
							QRIS {breakdown.qrisPercentage}%
						</Text>
					</View>
				</NeumorphicCard>

				{/* Export */}
				<NeumorphicButton
					title="Export ke Excel"
					onPress={handleExport}
					variant="primary"
					size="lg"
					style={styles.exportBtn}
				/>

				{/* Reset */}
				<Pressable
					onPress={() => setShowResetModal(true)}
					style={styles.resetBtn}
				>
					<Text style={styles.resetText}>Reset Semua Data</Text>
				</Pressable>
			</ScrollView>

			{/* Reset Confirmation Modal */}
			<NeumorphicModal
				visible={showResetModal}
				onClose={() => setShowResetModal(false)}
				title="Reset Semua Data"
				showCloseButton={false}
			>
				<Text style={styles.modalDesc}>
					Semua transaksi akan dihapus dan menu dikembalikan ke data awal. Aksi
					ini tidak dapat dibatalkan.
				</Text>
				<NeumorphicButton
					title="Batal"
					onPress={() => setShowResetModal(false)}
					variant="default"
					inset
					size="md"
					style={styles.modalBtn}
				/>
				<NeumorphicButton
					title="Ya, Reset"
					onPress={handleConfirmReset}
					variant="danger"
					size="md"
					style={styles.modalBtn}
				/>
			</NeumorphicModal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bg,
	},
	content: {
		padding: 18,
		paddingBottom: 40,
	},
	header: {
		paddingTop: 20,
		paddingBottom: 12,
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	summaryRow: {
		flexDirection: "column",
		gap: 10,
		marginBottom: 18,
	},
	summaryCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	summaryLabel: {
		fontSize: 10,
		color: Colors.textMuted,
		fontFamily: "Poppins_600SemiBold",
		letterSpacing: 1,
	},
	summaryValue: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	chartCard: {
		padding: 16,
		marginBottom: 18,
		alignItems: "center",
	},
	chart: {
		borderRadius: 12,
	},
	sectionLabel: {
		fontSize: 11,
		color: Colors.textMuted,
		fontWeight: "600",
		marginBottom: 12,
		fontFamily: "Poppins_600SemiBold",
		letterSpacing: 1,
	},
	section: {
		padding: 16,
		marginBottom: 18,
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingVertical: 6,
	},
	rankBadge: {
		width: 22,
		height: 22,
		borderRadius: 6,
		backgroundColor: Colors.bg,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	rankText: {
		fontSize: 10,
		fontWeight: "700",
		color: Colors.text,
		fontFamily: "Poppins_700Bold",
	},
	topName: {
		flex: 1,
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		fontFamily: "Poppins_600SemiBold",
	},
	topCount: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	breakdownBar: {
		height: 10,
		borderRadius: 6,
		flexDirection: "row",
		overflow: "hidden",
		marginBottom: 8,
		backgroundColor: Colors.bg,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.15,
		shadowRadius: 2,
		elevation: 1,
	},
	breakdownFill: {
		height: "100%",
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
	},
	breakdownLegend: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	legendText: {
		fontSize: 11,
		color: Colors.textMuted,
		fontFamily: "Poppins_500Medium",
	},
	exportBtn: {
		marginTop: 4,
		marginBottom: 24,
	},
	resetBtn: {
		alignItems: "center",
		paddingVertical: 12,
	},
	resetText: {
		fontSize: 12,
		color: Colors.textMuted,
		fontFamily: "Poppins_400Regular",
		letterSpacing: 0.5,
	},
	modalDesc: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		marginBottom: 20,
		lineHeight: 20,
		fontFamily: "Poppins_400Regular",
	},
	modalBtn: {
		marginBottom: 10,
		width: "100%",
	},
});
