import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'
import runServer from './runServer'
import run from './run'
import clean from './clean'
import copy from './copy'

const DEBUG = !process.argv.includes('--release')

async function start() {
	await run(clean)
	await run(copy.bind(null, {
		watch: true
	}))
	await new Promise(resolve => {

		// enable HMR
		webpackConfig.filter(x => x.target !== 'node').forEach(config => {
			if(Array.isArray(config.entry)) {
				config.entry.unshift('webpack-hot-middleware/client')
			} else {
				config.entry = ['webpack-hot-middleware/client', config.entry]
			}

			config.plugins.push(new webpack.HotModuleReplacementPlugin())
			config.plugins.push(new webpack.NoErrorsPlugin())
		})

		const compiler = webpack(webpackConfig)
		compiler.apply(new webpack.ProgressPlugin({
			profile: false
		}))

		const wpMiddleware = webpackMiddleware(compiler, {
			publicPath: webpackConfig[0].output.publicPath,
			stats: webpackConfig[0].stats,
		})
		const hotMiddlewares = compiler.compilers.filter(compiler => {
			return compiler.options.target !== 'node'
		}).map(compiler => webpackHotMiddleware(compiler))

		let handleServerBundleComplete = () => {
			runServer((err, host) => {
				if(!err) {
					const bs = BrowserSync.create()
					bs.init({
						...(DEBUG ? {} : {
							notify: false,
							ui: false
						}),
						proxy: {
							target: host,
							middleware: [wpMiddleware, ...hotMiddlewares],
						},
						files: ['dist/public/**/*.*'],
					}, resolve)
					handleServerBundleComplete = runServer
				}
			})
		}
		compiler.plugin('done', () => handleServerBundleComplete())
	})
}

export default start
