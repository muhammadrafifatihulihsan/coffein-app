import { Colors } from "./colors";

export const Theme = {
	colors: Colors,

	// Border radius
	radius: {
		lg: 24,
		md: 18,
		sm: 12,
		full: 9999,
	},

	// Spacing
	spacing: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		xxl: 24,
	},

	// Font sizes
	fontSize: {
		xs: 11,
		sm: 13,
		md: 15,
		lg: 18,
		xl: 22,
		xxl: 28,
		huge: 40,
	},

	// Shadow presets (raised neumorphism)
	shadow: {
		raised: {
			// Shadow terang (kiri-atas)
			shadowColor: Colors.shadowLight,
			shadowOffset: { width: -6, height: -6 },
			shadowOpacity: 1,
			shadowRadius: 12,
			// Shadow gelap (kanan-bawah) via Android elevation
			elevation: 8,
			// Note: React Native hanya support 1 shadow object.
			// Untuk dual shadow, kita gunakan wrapper View bertumpuk.
		},
		inset: {
			// Shadow ke dalam (concave)
			// Dicapai dengan conditional styling di komponen
		},
	},

	// Font family
	fontFamily: {
		regular: "Poppins_400Regular",
		medium: "Poppins_500Medium",
		semibold: "Poppins_600SemiBold",
		bold: "Poppins_700Bold",
	},
} as const;
