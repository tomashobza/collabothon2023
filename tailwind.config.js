/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				monserrat: ['Montserrat', 'sans-serif']
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#FFE900',
					secondary: '#FFE900',
					accent: '#04434D',
					neutral: '#2b3440',
					'base-100': '#ffffff',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
