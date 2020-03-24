#!/usr/bin/env node

"use strict"

const PORT = 8080


// Webpack build server
const webpack = require('webpack')
const config = require('../webpack.config.js')
const compiler = webpack(config)
const colors = require('colors')

let logSemaphore = 0
compiler.watch({}, function (err, stats) {
	console.log(stats.toString({ colors: true, chunks: false, children: false }))
	logSemaphore++
	setTimeout(function () {
		logSemaphore--
		if (logSemaphore == 0) {
			console.log()
			serverStatus()
			console.log()
		}
	}, 100)
})

// Express web server
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

io.on('connection', function (socket) {
	console.log('客户端接入')

	socket.on('console', command => {
		console.log('receive console: ', command)
		if (command === '') return
		const { spawn } = require('child_process')
		const [cwd, ...args] = command.split(' ')
		const proc = spawn(cwd, args)
		proc.stdout.pipe(process.stdout)
		proc.stderr.pipe(process.stderr)
		proc.stdout.on('data', data => {
			io.emit('console', data.toString())
		})
		proc.stderr.on('data', data => {
			io.emit('console', data.toString())
		})
		proc.on('error', error => {
			io.emit('console', error.toString())
		})

	})

	socket.on('disconnect', function () {
		console.log('user disconnected')
	})
})




const os = require('os')
const ifaces = os.networkInterfaces()

app.use('/dist', express.static(path.resolve(__dirname , '../dist')))
app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname , '../index.html'))
})

console.log('module.parent',module.parent)
if(!module.parent) {
	http.listen(PORT, function () {
		serverStatus()
	})
}else{
	module.exports = http
}


function serverStatus() {
	console.log("1Server listening on:")
	console.log(colors.cyan("http://localhost:%s"), PORT)

	Object.keys(ifaces).forEach(function (ifname) {
		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' === iface.family && iface.internal === false) {
				console.log(colors.cyan("http://%s:%s"), iface.address, PORT)
			}
		})
	})
}
