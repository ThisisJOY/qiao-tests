/************************** 
 app to read data from board 
****************************/

// const gps               = require('./lib/gps')
// const osInfo            = require('./lib/os-info')
// const accelerometer     = require('./lib/sensors/accelerometer')
// const gyroscope         = require('./lib/sensors/gyroscope')
// const microctrl         = require('./lib/sensors/microctrl')
// const pressure          = require('./lib/sensors/pressure')
// const temperature       = require('./lib/sensors/temperature')

// var state = {}

// gps.on('data', (input) => {
//  let type = input.type
//  let data = input.data

//  if (!state.gps)       { state.gps       = {} }
//  if (!state.gps[type]) { state.gps[type] = {} }

//  state.gps[type] = data
// })

// osInfo.on('data', (os) => {
//  state.os = os
// })

// accelerometer.on('new_linear_acceleration', (acc) => {
//   state.acc = acc
// })

// gyroscope.on('new_angular_acceleration', (gyro) => {
//   state.gyro = gyro
// })

// microctrl.on('new_data', (ctrl) => {
//   state.ctrl = ctrl
// })

// pressure.on('new_pressure', (press) => {
//   state.pressure = press
// })

// temperature.on("new_temperature", (temp) => {
//   state.temperature = temp
// })

// setInterval( () => { console.log(state) }, 2000)

/************************** 
 back-end for web page
****************************/

const express           = require('express')
const http              = require('http')
const config            = require('config')
const path              = require('path')
const io                = require('socket.io')
const os                = require('os')
const _ 	            = require('lodash')

const log               = require('./lib/log')

const app    = express()
const server = http.Server(app)
const sio    = io(server)

const port = config.server.port || 3000
const host = config.server.host || 'localhost'

// setting all the static path
app.use(express.static('./public'))
app.use('/vendor/bootstrap',          express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/vendor/babel',              express.static(path.join(__dirname, 'node_modules/babel-standalone')))
app.use('/vendor/react',              express.static(path.join(__dirname, 'node_modules/react/dist')))
app.use('/vendor/react-dom',          express.static(path.join(__dirname, 'node_modules/react-dom/dist')))
app.use('/vendor/socket.io-client',   express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')))
app.use('/vendor/recharts',           express.static(path.join(__dirname, 'node_modules/recharts/umd')))
app.use('/vendor/lodash',             express.static(path.join(__dirname, 'node_modules/lodash')))

// set up the main route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'))
})

// start the webserver
server.listen(port, host, () => {
	log.info(`Listening on http://${host}:${port}. Party time!`)
})

// listen for incoming websockets
var sockets = []
sio.on('connection', (socket) => {
	log.info('A new client connected')

	sockets.push(socket)

	socket.on('disconect', () => {
		// remove socket from sockets
		sockets.splice(sockets.indexOf(socket), 1)
	})

	socket.emit('message', 'hello you!')
	state = {
		data: [
		  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
		  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
		  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
		  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
		  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
		  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
		  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
		]
	}

	state = { 
		gps: 
		{ gpgga: 
		  { id: 'GPGGA',
		    time: '215000.313',
		    latitude: 'NaN',
		    longitude: 'NaN',
		    fix: 0,
		    satellites: 0,
		    hdop: 0,
		    altitude: NaN,
		    aboveGeoid: NaN,
		    dgpsUpdate: '',
		    dgpsReference: '' },
		  gprmc: 
		  { id: 'GPRMC',
		    time: '215000.313',
		    valid: 'V',
		    latitude: 'NaN',
		    longitude: 'NaN',
		    speed: 0,
		    course: 0,
		    date: '100180',
		    mode: '',
		    variation: NaN } },
		os: 
		{	
			hostname:          os.hostname(),
			arch:			   os.arch(),
			cpus:     		   os.cpus(),
			freemem:  		   os.freemem(),
			totalmem: 		   os.totalmem(),
			loadavg:  		   os.loadavg(), 
			networkInterfaces: os.networkInterfaces(),
			platform:		   os.platform(),
			release:		   os.release(),
			type:			   os.type(),
			uptime:            os.uptime(),		
			availdisk: 68554752,
			freedisk: 73506816,
			totaldisk: 457306112
		},
		acc: { x: 456, y: 47, z: 16822 },
		gyro: { x: 105, y: -1046, z: -518 },
		ctrl: 
		{ vbus: 14.412,
		 vign: 0.176,
		 brd_temp: 28.29,
		 pwr_temp: 0,
		 vi1: 630,
		 vi2: 370,
		 vi3: 375,
		 vi4: 1003,
		 ao1: 0,
		 ao2: 0,
		 va01: 0.355,
		 va02: 0.407,
		 out: 0 },
		pressure: { pressure: 760 },
		temperature: { LPS25HB: 0, LSM6DS3: 7 } }

	setInterval(() => {
		state.os.loadavg = os.loadavg().map((i) => i/4)

		socket.emit('state', state)
	}, 1000)

})
