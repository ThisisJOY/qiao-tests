/*********************************************************************
 * read data from ivh2
 *********************************************************************/

const gps               = require('./lib/gps')
const osInfo            = require('./lib/os-info')
const accelerometer     = require('./lib/sensors/accelerometer')
const gyroscope         = require('./lib/sensors/gyroscope')
const microctrl         = require('./lib/sensors/microctrl')
const pressure          = require('./lib/sensors/pressure')
const temperature       = require('./lib/sensors/temperature')

var state = {}

gps.on('data', (input) => {
 let type = input.type
 let data = input.data

 if (!state.gps)       { state.gps       = {} }
 if (!state.gps[type]) { state.gps[type] = {} }

 state.gps[type] = data
})

osInfo.on('data', (os) => {
 state.os = os
})

accelerometer.on('new_linear_acceleration', (acc) => {
  state.acc = acc
})

gyroscope.on('new_angular_acceleration', (gyro) => {
  state.gyro = gyro
})

microctrl.on('new_data', (ctrl) => {
  state.ctrl = ctrl
})

pressure.on('new_pressure', (press) => {
  state.pressure = press
})

temperature.on("new_temperature", (temp) => {
  state.temperature = temp
})

// setInterval( () => { console.log(state) }, 1000)

/*********************************************************************
 * back-end for web page
 *********************************************************************/

const express           = require('express')
const http              = require('http')
const config            = require('config')
const path              = require('path')
const io                = require('socket.io')
const os                = require('os')
const _                 = require('lodash')
const log               = require('./lib/log')

const app    = express()
const server = http.Server(app)
const sio    = io(server)

var port = config.server.port || 3000
var host = config.server.host || 'localhost'
// const host = config.server.host || '192.168.1.25'

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

//Get the correct network interface to listen on:
var networkifs = os.networkInterfaces();
//log.info('Network Ifs',networkifs);

if (networkifs.eth0){
	//log.info('Using ', networkifs.eth0[0].address);
	host = networkifs.eth0[0].address;
}

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

	// send the state to front-end
	setInterval(() => {
		socket.emit('state', state)
	}, 1000)

/*********************************************************************
	 * receive configuration commands from front-end
 *********************************************************************/

	const i2c                         = require("i2c-bus")
	const I2C_ADDR                    = 0
	const bus   			     	  = i2c.openSync(I2C_ADDR)
	// const buffer                      = Buffer.alloc(2, 0x00)
	const LSM6DS3_ADDR                = 0x6B
	const LPS25HB_ADDR                = 0x5D
	const ACC_REGISTRY_CTRL           = 0x10
	const GYRO_REGISTRY_CTRL          = 0x11
	const MICROCTRL_ADDR              = 0x55
	const PMIC_REG_AO1                = 0x20
	const PMIC_REG_AO2                = 0x22
	const PMIC_REG_PWROFF_VLOW        = 0x8C
	const PMIC_REG_PWRON_VHIGH        = 0x8E
	const PMIC_REG_WD                 = 0x40 
	const PMIC_REG_WD_TIMEOUT         = 0x44
	const PMIC_REG_WD_RESET           = 0x46 
	const TURN_ON_13                  = 0x10 // 13 Hz (low power)
	const TURN_OFF                    = 0x00 // 0

	socket.on('switches', (flag, mode) => {

		if (flag === "acc") {
			log.info(mode ? "Turning accelerometer on": "Turning accelerometer off")
			bus.writeByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL, mode ? TURN_ON_13 : TURN_OFF)
		}

		if (flag === "gyro") {
			log.info(mode ? "Turning gyroscope on": "Turning gyroscope off")
			bus.writeByteSync(LSM6DS3_ADDR, GYRO_REGISTRY_CTRL, mode ? TURN_ON_13 : TURN_OFF)			
		}

		if (flag === "wd") {
			log.info(mode ? "Enabling watchdog timer": "Disabling watchdog timer")
			bus.writeByteSync(LSM6DS3_ADDR, PMIC_REG_WD, mode ? 0xFF : 0x00)
		}

		if (flag === "wdres") {
			log.info("Resetting watchdog timer")
			bus.writeByteSync(MICROCTRL_ADDR, PMIC_REG_WD_RESET, 0xD0)
		}

	})

	socket.on('save', (flag, value, message) => {

		if (flag === "ao1") {
			log.info(message)
			bus.writeWordSync(MICROCTRL_ADDR, PMIC_REG_AO1, Number(value))
		}

		if (flag === "ao2") {
			log.info(message)
			bus.writeWordSync(MICROCTRL_ADDR, PMIC_REG_AO2, Number(value))			
		}

		if (flag === "vlow") {
			log.info(message)
			bus.writeWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_VLOW, Number(value))			
		}

		if (flag === "vhigh") {
			log.info(message)
			bus.writeWordSync(MICROCTRL_ADDR, PMIC_REG_PWRON_VHIGH, Number(value))			
		}

		if (flag === "wdto") {
			log.info(message)
			bus.writeWordSync(MICROCTRL_ADDR, PMIC_REG_WD_TIMEOUT, Number(value))
		}

	})

})