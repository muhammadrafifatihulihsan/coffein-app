import {
	DateFilter,
	SalesSummary,
	TopMenuItem,
	PaymentBreakdown,
	Transaction,
} from "../types";

function getStartOfDay(date: Date): number {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}

function getStartOfWeek(date: Date): number {
	const d = new Date(date);
	const day = d.getDay();
	const diff = d.getDate() - day + (day === 0 ? -6 : 1);
	d.setDate(diff);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}

function getStartOfMonth(date: Date): number {
	const d = new Date(date);
	d.setDate(1);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}

export function filterTransactions(
	transactions: Transaction[],
	filter: DateFilter,
): Transaction[] {
	if (filter === "all") return transactions;

	const now = new Date();
	let startTime: number;

	switch (filter) {
		case "today":
			startTime = getStartOfDay(now);
			break;
		case "week":
			startTime = getStartOfWeek(now);
			break;
		case "month":
			startTime = getStartOfMonth(now);
			break;
		default:
			return transactions;
	}

	return transactions.filter((t) => t.createdAt >= startTime);
}

export function groupTransactionsByDay(
	transactions: Transaction[],
	days: number,
): { date: string; total: number }[] {
	const result: { date: string; total: number }[] = [];
	const now = new Date();

	for (let i = days - 1; i >= 0; i--) {
		const d = new Date(now);
		d.setDate(d.getDate() - i);
		d.setHours(0, 0, 0, 0);
		const startOfDay = d.getTime();
		const endOfDay = startOfDay + 86400000;

		const dayTotal = transactions
			.filter((t) => t.createdAt >= startOfDay && t.createdAt < endOfDay)
			.reduce((sum, t) => sum + t.total, 0);

		const dayName = d.toLocaleDateString("id-ID", { weekday: "short" });
		result.push({ date: dayName, total: dayTotal });
	}

	return result;
}

export function calculateSalesSummary(
	transactions: Transaction[],
): SalesSummary {
	const now = new Date();
	const todayStart = getStartOfDay(now);
	const monthStart = getStartOfMonth(now);

	let today = 0;
	let thisMonth = 0;
	let allTime = 0;

	for (const t of transactions) {
		allTime += t.total;
		if (t.createdAt >= todayStart) {
			today += t.total;
		}
		if (t.createdAt >= monthStart) {
			thisMonth += t.total;
		}
	}

	return { today, thisMonth, allTime };
}

export function getTopMenuItems(
	transactions: Transaction[],
	limit: number,
): TopMenuItem[] {
	const countMap: Record<string, { name: string; count: number }> = {};

	for (const t of transactions) {
		for (const item of t.items) {
			if (!countMap[item.productId]) {
				countMap[item.productId] = { name: item.name, count: 0 };
			}
			countMap[item.productId].count += item.qty;
		}
	}

	return Object.entries(countMap)
		.map(([productId, data]) => ({
			productId,
			name: data.name,
			count: data.count,
		}))
		.sort((a, b) => b.count - a.count)
		.slice(0, limit);
}

export function calculatePaymentBreakdown(
	transactions: Transaction[],
): PaymentBreakdown {
	let cash = 0;
	let qris = 0;

	for (const t of transactions) {
		if (t.paymentMethod === "CASH") {
			cash += t.total;
		} else {
			qris += t.total;
		}
	}

	const total = cash + qris;
	return {
		cash,
		qris,
		cashPercentage: total > 0 ? Math.round((cash / total) * 100) : 0,
		qrisPercentage: total > 0 ? Math.round((qris / total) * 100) : 0,
	};
}

export function formatDate(timestamp: number): string {
	const d = new Date(timestamp);
	return d.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function formatTime(timestamp: number): string {
	const d = new Date(timestamp);
	return d.toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function formatDateTime(timestamp: number): string {
	return `${formatDate(timestamp)} · ${formatTime(timestamp)}`;
}
