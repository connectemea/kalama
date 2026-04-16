/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'borderColor': '#231F20',
				'customBlue': '#276692',
				'customGreen': '#cd205c',
				'customOrange': '#F99D1C',
				'customEmerald': '#00A99D',
				'customRed': '#F44336',
				'customLightBlue': '#3592BA',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}


