/**************************
 * read data from ivh2
 **************************/

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

// setInterval( () => { console.log(state) }, 2000)

/**************************
 * back-end for web page
 **************************/

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

	/************************************************
	 * receive configuration commands from front-end
	 ************************************************/

	const i2c               = require("i2c-bus")

	const I2C_ADDR                    = 0
	const LSM6DS3_ADDR                = 0x6B
	const LPS25HB_ADDR                = 0x5D
	const ACC_REGISTRY_CTRL           = 0x10
	const ACC_REGISTRY_X              = 0x28
	const ACC_REGISTRY_Y              = 0x2A
	const ACC_REGISTRY_Z              = 0x2C
	const GYRO_REGISTRY_CTRL          = 0x11
	const GYRO_REGISTRY_X             = 0x22
	const GYRO_REGISTRY_Y             = 0x24
	const GYRO_REGISTRY_Z             = 0x26
	const LPS25HB_PRESS_REGISTRY_CTRL = 0x20
	const LPS25HB_TEMP_REGISTRY_CTRL  = 0x20
	const LSM6DS3_TEMP_REGISTRY_CTRL  = 0x21

	const TURN_ON_13                  = 0x10 // 13 Hz (low power)
	const TURN_OFF                    = 0x00 // 0

	const TURN_ON_PD_LPS              = 0X80

	const MICROCTRL_ADDR    = 0x55
	// const PMIC_REG_VBUS     = 0x02
	// const PMIC_REG_VIGN     = 0x04
	// const PMIC_REG_BRD_TEMP = 0x06
	// const PMIC_REG_PWR_TEMP = 0x08
	// const PMIC_REG_VI1      = 0x0A
	// const PMIC_REG_VI2      = 0x0C
	// const PMIC_REG_VI3      = 0x0E
	// const PMIC_REG_VI4      = 0x10
	const PMIC_REG_AO1      = 0x12
	const PMIC_REG_AO2      = 0x14
	// const PMIC_REG_VAO1     = 0x16
	// const PMIC_REG_VAO2     = 0x18

	const AO1_REGISTRY_CTRL = 0x12
	const AO2_REGISTRY_CTRL = 0x14
	const INPUT_AO1 = 0x0001
	const INPUT_AO2 = 0x0001

	const bus    = i2c.openSync(I2C_ADDR)
	const buffer = Buffer.alloc(2, 0x00)

	// accelerometer
	socket.on('accOff', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL, TURN_OFF)
	})

	socket.on('accOn', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL, TURN_ON_13)
	})

	// gyroscope
	socket.on('gyroOff', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, GYRO_REGISTRY_CTRL, TURN_OFF)
	})

	socket.on('gyroOn', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, GYRO_REGISTRY_CTRL, TURN_ON_13)
	})

	// pressure LPS25HB
	socket.on('pressOff', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, LPS25HB_PRESS_REGISTRY_CTRL, TURN_OFF)
	})

	socket.on('pressOn', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, LPS25HB_PRESS_REGISTRY_CTRL, TURN_ON_PD_LPS)
	})

	// temperature LSM6DS3
	socket.on('tempLSMOff', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, LSM6DS3_TEMP_REGISTRY_CTRL, TURN_OFF)
	})

	socket.on('tempLSMOn', (message) => {
		log.info(message)
		bus.writeByteSync(LSM6DS3_ADDR, LSM6DS3_TEMP_REGISTRY_CTRL, TURN_ON_13)
	})

	// ctrl ao1
	socket.on('editAo1', (message) => {
		log.info(message)
		bus.writeByteSync(MICROCTRL_ADDR, AO1_REGISTRY_CTRL, INPUT_AO1)
	})

	socket.on('resetAo1', (message) => {
		log.info(message)
		bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO1)
	})

	// ctrl ao2
	socket.on('editAo2', (message) => {
		log.info(message)
		bus.writeByteSync(MICROCTRL_ADDR, AO2_REGISTRY_CTRL, INPUT_AO2)
	})

	socket.on('resetAo2', (message) => {
		log.info(message)
		bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO2)
	})
})
