const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/**/*.{html,js,ts}'],
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
			'white': {
				'DEFAULT': '#ffffff',
				'80': '#cccccc',
				'60': '#999999',
			},
			'primary': {
				'DEFAULT': '#5468ff',
				'hover': '#4752c4',
				'active': '#3c45a5',
			},
			'secondary': '#4f545c',
			'danger': '#ed4245',
			'success': '#3ba55d',
			'success2': {
				'DEFAULT': '#2d7d46',
				'hover': '#215b32',
				'active': '#1e532e',
			},
			'half': {
				'DEFAULT': '#36393f',
				'primary': {
					'DEFAULT': '#36393f',
					'hover': '#33363b',
					'active': '#373a3f',
				},
				'secondary': '#2f3136',
				'tertiary': '#202225',
				'quaternary': '#42464d',
				'quinary': '#18191c',
				'sextenary': '#292b2f',
				'seventy': '#72767d',
			},
			'fade': {
				'DEFAULT': '#aaaaab',
				'primary': '#aaaaab',
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
	plugins: [
		require('tw-elements/dist/plugin'),
	],
};
