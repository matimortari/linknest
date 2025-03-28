const tailwindConfig = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)"
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)"
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)"
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)"
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)"
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)"
				},
				danger: {
					DEFAULT: "var(--danger)",
					foreground: "var(--danger-foreground)"
				},
				success: {
					DEFAULT: "var(--success)",
					foreground: "var(--success-foreground)"
				},
				border: "var(--border)",
				input: "var(--input)"
			}
		}
	}
}

export default tailwindConfig
