export const themes = {
	light: {
		bgColor: "#ffffff",
		textColor: "#333333",
		primaryColor: "#250524",
		primaryColorLight: "#4a0a48",
		primaryColorDark: "#120212",
		secondaryColor: "#666666",
		borderColor: "#dddddd",
		focusColor: "#007bff",
		focusShadowColor: "rgba(0, 123, 255, 0.25)",
		cardShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
		successColor: "#4caf50",
	},
	dark: {
		bgColor: "#1a202c",
		textColor: "#ffffff",
		primaryColor: "#63b3ed",
		primaryColorLight: "#90cdf4",
		primaryColorDark: "#2b6cb0",
		secondaryColor: "#a0aec0",
		borderColor: "#2d3748",
		focusColor: "#63b3ed",
		focusShadowColor: "rgba(99, 179, 237, 0.25)",
		cardShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
		successColor: "#68d391",
	},
	halloween: {
		bgColor: "#160B00",
		textColor: "#FFF3E0",
		primaryColor: "#FF6D00",
		primaryColorLight: "#FF9E40",
		primaryColorDark: "#E65100",
		secondaryColor: "#B388FF",
		borderColor: "#4A148C",
		focusColor: "#FF6D00",
		focusShadowColor: "rgba(255, 109, 0, 0.25)",
		cardShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
		successColor: "#00C853",
	},
} as const;

export function applyTheme(themeName: keyof typeof themes) {
	const theme = themes[themeName];
	Object.entries(theme).forEach(([key, value]) => {
		// Convert camelCase to kebab-case for CSS vars
		const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
		document.documentElement.style.setProperty(cssVar, value);
	});
}
