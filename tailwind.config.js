const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		colors: {
			...colors,
			'primary': '#5468ff',
			'secondary': '#4f545c',
			'danger': '#ed4245',
			'success': '#3ba55d',
			'half': {
				'DEFAULT': '#36393f',
				'primary': '#36393f',
				'secondary': '#2f3136',
				'tertiary': '#202225',
				'quaternary': '#42464d',
			}
		},
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
			sans: ['Open sans', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
			robotomono: ['Roboto Mono', 'monospace'],
		},
		extends: {},
	},
	plugins: [],
};
