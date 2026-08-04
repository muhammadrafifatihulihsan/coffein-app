import React from "react";
import {
	Modal,
	View,
	Text,
	StyleSheet,
	Pressable,
	Dimensions,
} from "react-native";
import { Colors } from "../../constants/colors";

interface NeumorphicModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	showCloseButton?: boolean;
}

const { width } = Dimensions.get("window");

export function NeumorphicModal({
	visible,
	onClose,
	title,
	children,
	showCloseButton = true,
}: NeumorphicModalProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable style={styles.overlay} onPress={onClose}>
				<Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
					{/* Dual shadow layers */}
					<View style={styles.shadowLight} pointerEvents="none" />
					<View style={styles.shadowDark} pointerEvents="none" />
					<View style={styles.inner}>
						{title && <Text style={styles.title}>{title}</Text>}
						{children}
						{showCloseButton && (
							<Pressable onPress={onClose} style={styles.closeBtn}>
								<Text style={styles.closeText}>Tutup</Text>
							</Pressable>
						)}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(66, 54, 40, 0.3)",
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	content: {
		width: width - 48,
		position: "relative",
		overflow: "visible",
	},
	shadowLight: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 24,
		shadowColor: "#FFFFFF",
		shadowOffset: { width: -6, height: -6 },
		shadowOpacity: 0.8,
		shadowRadius: 12,
		elevation: 0,
	},
	shadowDark: {
		position: "absolute",
		top: -3,
		left: -3,
		right: -3,
		bottom: -3,
		backgroundColor: Colors.bg,
		borderRadius: 24,
		shadowColor: Colors.shadowDark,
		shadowOffset: { width: 6, height: 6 },
		shadowOpacity: 0.5,
		shadowRadius: 12,
		elevation: 8,
	},
	inner: {
		backgroundColor: Colors.bg,
		borderRadius: 20,
		padding: 24,
		zIndex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
		textAlign: "center",
		marginBottom: 16,
	},
	closeBtn: {
		marginTop: 16,
		alignItems: "center",
	},
	closeText: {
		fontSize: 14,
		color: Colors.textMuted,
		fontWeight: "600",
	},
});
