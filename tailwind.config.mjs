/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				nulshock: ['nulshock', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			colors: {
				primary: {
					DEFAULT: "#95BF56",
					alt: "#A0BFSE"
				},
				secondary: {
					DEFAULT: "#D3D929",
					alt: "#D9CB11"
				},
			}
		},
		container: {
			center: true,
			padding: '1rem',
		}
	},
	plugins: [],
}
