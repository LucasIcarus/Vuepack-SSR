import webpack from 'webpack'
import { join } from 'path'
import AssetsPlugin from 'assets-webpack-plugin'
import merge from 'webpack-merge'
import nodeExt from 'webpack-node-externals'
import config from '../config.js'

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')
const { path, AUTOPREFIXER_BROWSERS } = config
const GLOBALS = {
	'process.env.NODE_ENV': DEBUG ?
		'"development"' : '"production"',
	__DEV__: DEBUG,
}
const postcss = [
	require('precss')(),
	require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
]

const baseConfig = {
	output: {
		publicPath: '/',
		sourcePrefix: '  ',
	},
	cache: DEBUG,
	debug: DEBUG,

	stats: {
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: true,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE,
	},
	resolve: {
		extensions: ['', '.js', '.vue', '.css', ]
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: path.src,
		}, {
			test: /\.vue$/,
			loaders: ['vue'],
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'url?limit=10000&name=public/img/[hash].[ext]',
			include: path.src,
		}, {
			test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
			loader: 'url-loader',
			include: path.src,
		}, ]
	},
	babel: {
		babelrc: false,
		presets: [
			['es2015', { modules: false }],
			'stage-1'
		],
		plugins: ['transform-runtime']
	},
	vue: {
		loaders: {},
		postcss,
	},
	postcss,
}

const clientConfig = merge(baseConfig, {
	entry: ['./src/client/main.js'],
	output: {
		path: join(path.dist, '/public'),
		filename: DEBUG ?
			'[name].js?[hash]' : '[name].[hash].js',
	},
	devtool: DEBUG ?
		'cheap-module-eval-source-map' : false,
	plugins: [
		new webpack.DefinePlugin({
			...GLOBALS,
			'process.env.BROWSER': true
		}),
		new AssetsPlugin({
			path: path.dist,
			filename: 'assets.js',
			processOutput: x => `module.exports = ${JSON.stringify(x)}`
		}),
		...(!DEBUG ? [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: true,
					warnings: VERBOSE,
				}
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
		] : []),
	],
})

const serverConfig = merge(baseConfig, {
	entry: ['./src/server/main.js'],
	output: {
		path: path.dist,
		filename: 'server.js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			...GLOBALS,
			'process.env.BROWSER': false
		}),
	],
	externals: [nodeExt(), /\.\/assets$/]
})

const serverBundleConfig = merge(baseConfig, {
	entry: ['./src/client/server-entry.js'],
	target: 'node',
	output: {
		path: path.dist,
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2',
	},
	devtool: false,
	plugins: [
		new webpack.DefinePlugin({
			...GLOBALS,
			'process.env.BROWSER': false,
			'process.env.VUE_ENV': '"server"'
		})
	],
	externals: ['axios'],
})

export default [clientConfig, serverConfig, serverBundleConfig]
