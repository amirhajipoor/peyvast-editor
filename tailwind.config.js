/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#020351",
				body: '#ffee7c',
			},
		},
	},
	plugins: [],
};
