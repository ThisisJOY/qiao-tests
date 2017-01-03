var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var gyroscope = new EventEmitter()
var I2C_ADDR = 0
var LSM6DS3_ADDR = 0x6B
// var GYRO_REGISTRY_CTRL = 0x11
var GYRO_REGISTRY_X = 0x22
var GYRO_REGISTRY_Y = 0x24
var GYRO_REGISTRY_Z = 0x26

var TURN_ON_13 = 0x10
var TURN_OFF = 0x00

var bus = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(2, 0x00)

// console.log("Turning gyroscope off..")
// bus.writeByteSync(LSM6DS3_ADDR, GYRO_REGISTRY_CTRL, TURN_OFF)
// console.log("Turning gyroscope on..")
// bus.writeByteSync(LSM6DS3_ADDR, GYRO_REGISTRY_CTRL, TURN_ON_13)

var getGyro = () => {
  var xBytes = bus.readWordSync(LSM6DS3_ADDR, GYRO_REGISTRY_X)
  var yBytes = bus.readWordSync(LSM6DS3_ADDR, GYRO_REGISTRY_Y)
  var zBytes = bus.readWordSync(LSM6DS3_ADDR, GYRO_REGISTRY_Z)

  buffer.writeUInt16BE(xBytes, 0)
  var x = buffer.readInt16BE(0)

  buffer.writeUInt16BE(yBytes, 0)
  var y = buffer.readInt16BE(0)

  buffer.writeUInt16BE(zBytes, 0)
  var z = buffer.readInt16BE(0)

  gyroscope.emit("new_angular_acceleration", {
    x: x,
    y: y,
    z: z
  })
}

setInterval(getGyro, 1000)

process.on("SIGINT", function(cb) {
  bus.closeSync()
  return process.exit()
})

module.exports = gyroscope