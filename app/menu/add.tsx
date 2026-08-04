import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { NeumorphicInput } from "../../components/ui/NeumorphicInput";
import { NeumorphicButton } from "../../components/ui/NeumorphicButton";
import { useProductStore } from "../../store/productStore";
import { Colors } from "../../constants/colors";
import { ProductCategory } from "../../types";

export default function AddMenuScreen() {
	const router = useRouter();
	const addProduct = useProductStore((s) => s.addProduct);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState<ProductCategory>("Kopi");
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		if (!name.trim()) {
			Alert.alert("Error", "Nama menu harus diisi");
			return;
		}
		const priceNum = parseInt(price, 10);
		if (!price || isNaN(priceNum) || priceNum <= 0) {
			Alert.alert("Error", "Harga harus diisi dengan angka yang valid");
			return;
		}

		setLoading(true);
		addProduct(name.trim(), priceNum, category);
		setLoading(false);
		router.back();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Tambah Menu",
					headerStyle: { backgroundColor: Colors.bg },
					headerTintColor: Colors.text,
					headerTitleStyle: { fontFamily: "Poppins_600SemiBold" },
				}}
			/>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<NeumorphicInput
					label="Nama Menu"
					placeholder="Contoh: Kopi Susu Gula Aren"
					value={name}
					onChangeText={setName}
				/>

				<NeumorphicInput
					label="Harga (Rp)"
					placeholder="Contoh: 25000"
					value={price}
					onChangeText={setPrice}
					keyboardType="numeric"
					containerStyle={{ marginTop: 16 }}
				/>

				<Text style={styles.sectionLabel}>Kategori</Text>
				<View style={styles.categoryRow}>
					{(["Kopi", "Non-Kopi", "Snack"] as ProductCategory[]).map((cat) => (
						<NeumorphicButton
							key={cat}
							title={cat}
							onPress={() => setCategory(cat)}
							size="sm"
							variant={category === cat ? "primary" : "default"}
							inset={category === cat}
						/>
					))}
				</View>

				<NeumorphicButton
					title="Simpan Menu"
					onPress={handleSave}
					variant="primary"
					size="lg"
					loading={loading}
					style={styles.saveBtn}
				/>
			</ScrollView>
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
		gap: 0,
	},
	sectionLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.text,
		marginBottom: 12,
		marginTop: 16,
		fontFamily: "Poppins_600SemiBold",
	},
	categoryRow: {
		flexDirection: "row",
		gap: 8,
		flexWrap: "wrap",
	},
	saveBtn: {
		marginTop: 32,
	},
});
