import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { NeumorphicInput } from "../../../components/ui/NeumorphicInput";
import { NeumorphicButton } from "../../../components/ui/NeumorphicButton";
import { NeumorphicModal } from "../../../components/ui/NeumorphicModal";
import { useProductStore } from "../../../store/productStore";
import { Colors } from "../../../constants/colors";
import { ProductCategory } from "../../../types";

export default function EditMenuScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const product = useProductStore((s) => s.getProductById(id || ""));
	const editProduct = useProductStore((s) => s.editProduct);
	const deleteProduct = useProductStore((s) => s.deleteProduct);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState<ProductCategory>("Kopi");
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(String(product.price));
			setCategory(product.category);
		}
	}, [product]);

	if (!product) {
		return (
			<SafeAreaView style={styles.container}>
				<Text
					style={{
						textAlign: "center",
						marginTop: 40,
						color: Colors.textMuted,
					}}
				>
					Menu tidak ditemukan
				</Text>
			</SafeAreaView>
		);
	}

	const handleSave = () => {
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
		editProduct(id!, { name: name.trim(), price: priceNum, category });
		setLoading(false);
		router.back();
	};

	const handleDelete = () => {
		deleteProduct(id!);
		setShowDeleteModal(false);
		router.back();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: "Edit Menu",
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
					placeholder="Nama menu"
					value={name}
					onChangeText={setName}
				/>
				<NeumorphicInput
					label="Harga (Rp)"
					placeholder="Harga"
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
					title="Simpan Perubahan"
					onPress={handleSave}
					variant="primary"
					size="lg"
					loading={loading}
					style={styles.saveBtn}
				/>
				<NeumorphicButton
					title="Hapus Menu"
					onPress={() => setShowDeleteModal(true)}
					variant="danger"
					size="lg"
					style={styles.deleteBtn}
				/>
			</ScrollView>

			<NeumorphicModal
				visible={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				title="Hapus Menu?"
			>
				<Text style={styles.modalText}>
					Yakin ingin menghapus "{product.name}"? Tindakan ini tidak dapat
					dibatalkan.
				</Text>
				<View style={styles.modalActions}>
					<NeumorphicButton
						title="Batal"
						onPress={() => setShowDeleteModal(false)}
						size="sm"
						style={{ flex: 1 }}
					/>
					<NeumorphicButton
						title="Hapus"
						onPress={handleDelete}
						variant="danger"
						size="sm"
						style={{ flex: 1 }}
					/>
				</View>
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
	deleteBtn: {
		marginTop: 12,
	},
	modalText: {
		fontSize: 14,
		color: Colors.textMuted,
		textAlign: "center",
		marginBottom: 20,
		lineHeight: 22,
		fontFamily: "Poppins_400Regular",
	},
	modalActions: {
		flexDirection: "row",
		gap: 10,
	},
});
