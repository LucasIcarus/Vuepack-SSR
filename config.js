import { join, resolve } from 'path'

const config = {

	// path
	path: {
		root: resolve(__dirname),
		src: join(__dirname, './src'),
		dist: join(__dirname, './dist'),
		static: join(__dirname, './dist/public')
	},

	// post-css
	AUTOPREFIXER_BROWSERS: [
		'Android 2.3',
		'Android >= 4',
		'Firefox >= 31',
		'Explorer >= 9',
		'Chrome >= 35',
		'iOS >= 7',
		'Opera >= 12',
		'Safari >= 7.1'
	],

	// server
	port: 5000,

	//mongoose
}

export default config
