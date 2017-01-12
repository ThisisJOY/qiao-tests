var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var accelerometer = new EventEmitter()

var I2C_ADDR          = 0
var LSM6DS3_ADDR      = 0x6B
var ACC_REGISTRY_CTRL = 0x10
var ACC_REGISTRY_X    = 0x28
var ACC_REGISTRY_Y    = 0x2A
var ACC_REGISTRY_Z    = 0x2C

// Signals
var TURN_ON_13    = 0x10 // 13 Hz (low power)
var TURN_OFF      = 0x00 // 0

var bus    = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(2, 0x00)

console.log("Turning accelerometer off...")
bus.writeByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL, TURN_OFF)
console.log("Turning accellerometer on...")
bus.writeByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL, TURN_ON_13)

var getAcceleration = () => {
  var xBytes = bus.readWordSync(LSM6DS3_ADDR, ACC_REGISTRY_X)
  var yBytes = bus.readWordSync(LSM6DS3_ADDR, ACC_REGISTRY_Y)
  var zBytes = bus.readWordSync(LSM6DS3_ADDR, ACC_REGISTRY_Z)
  // console.log(xBytes, yBytes, zBytes)
  buffer.writeUInt16BE(xBytes, 0)
  var x = buffer.readInt16BE(0)

  buffer.writeUInt16BE(yBytes, 0)
  var y = buffer.readInt16BE(0)

  buffer.writeUInt16BE(zBytes, 0)
  var z = buffer.readInt16BE(0)

  o = {
    x: x,
    y: y,
    z: z,
    status: bus.readByteSync(LSM6DS3_ADDR, ACC_REGISTRY_CTRL)
  }
  // console.log(o)
  accelerometer.emit("new_linear_acceleration", o)
}

setInterval(getAcceleration, 1000)

process.on("SIGINT", function(cb) {
  bus.closeSync()
  return process.exit()
})

module.exports = accelerometer