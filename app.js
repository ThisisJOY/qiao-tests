/************************** 
 read data from board
****************************/

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

setInterval( () => { console.log(state) }, 2000)