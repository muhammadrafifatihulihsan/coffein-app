import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import { Transaction } from "../types";
import { formatCurrency } from "./formatCurrency";
import { formatDateTime } from "./dateHelpers";
import { File, Paths } from "expo-file-system";

export async function exportExcel(transactions: Transaction[]): Promise<void> {
	try {
		// Build data rows
		const rows: string[][] = [
			[
				"Tanggal",
				"Waktu",
				"Item",
				"Qty",
				"Harga Satuan",
				"Subtotal",
				"Total",
				"Metode Bayar",
			],
		];

		for (const tx of transactions) {
			const dt = formatDateTime(tx.createdAt);
			const [date, time] = dt.split(" · ");
			for (let i = 0; i < tx.items.length; i++) {
				const item = tx.items[i];
				rows.push([
					i === 0 ? date : "",
					i === 0 ? time || "" : "",
					item.name,
					String(item.qty),
					formatCurrency(item.price),
					formatCurrency(item.price * item.qty),
					i === 0 ? formatCurrency(tx.total) : "",
					i === 0 ? tx.paymentMethod : "",
				]);
			}
		}

		// Create workbook
		const ws = XLSX.utils.aoa_to_sheet(rows);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Transaksi");

		// Generate file
		const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
		const fileName = `Coffein_Transaksi_${Date.now()}.xlsx`;
		const file = new File(Paths.cache, fileName);
		await file.write(wbout, { encoding: "base64" });

		// Share
		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(file.uri, {
				mimeType:
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				dialogTitle: "Export Transaksi Coffein",
			});
		}
	} catch (error) {
		console.error("Export failed:", error);
		throw error;
	}
}
