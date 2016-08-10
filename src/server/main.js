process.env.VUE_ENV = 'server'

import path from 'path'
import config from '../../config.js'
import express from 'express'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import xtpl from 'xtpl'
import serialize from 'serialize-javascript'
import PrettyError from 'pretty-error'

const fs = require('fs')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const bundlePath = path.resolve(__dirname, './server-bundle.js')
const renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'), {
	cache: require('lru-cache')({ max: 10000 })
})
const assets = require('./assets')

const app = express()
app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'xtpl')

app.use(favicon(path.resolve(__dirname, './public/logo.png')))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('*', async(req, res, next) => {
	try {
		let statusCode = 200
		const data = {
			title: 'Vuepack-SSR',
			// description: '',
			// css: '',
			body: '',
			entry: assets.main.js,
		}
		const context = { url: req.url }
		new Promise(resolve => {
			renderer.renderToString(context, (err, html) => {
				if(err) {
					next(err)
				}
				data.body = html
				resolve()
			})
		}).then(() => {
			data.initialState = serialize(context.initialState, { isJSON: true })
			res.status(statusCode)
			res.render('index', data)
		})
	} catch(e) {
		next(err)
	}
})

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res, next) => {
	console.log(pe.render(err))
	const statusCode = err.status || 500
	res.status(statusCode)
	res.render('error', {
		title: 'Error',
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? '' : err.stack
	})
})

app.listen(config.port, () => {
	console.log(`The server is running at http://localhost:${config.port}/`)
})
