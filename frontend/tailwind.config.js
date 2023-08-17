/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		colors: {
			coal: "#424342",
			aqua: "#6BC7D4",
			aquaDark: "#4D9CA7",
			white: "#fff",
			black: "#000",
			danger: "#DB3033",
			success: "#40DB25"
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["winter"]
	}
}
