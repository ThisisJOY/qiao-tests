var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var pressure = new EventEmitter()

var I2C_ADDR       = 0
var LPS25HB_ADDR   = 0x5D
var PRESS_REGISTRY = 0x28

var bus    = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(3, 0x00)

var getPressure = () => {
  bus.readI2cBlockSync(LPS25HB_ADDR, PRESS_REGISTRY | 0x80, 3, buffer)
  var press = (buffer.readIntLE(0, 3)) / 4096

  pressure.emit("new_pressure", {
    pressure: press
  })
}   

setInterval(getPressure, 1000)

process.on("SIGINT", function(cb) {
  bus.closeSync()
  return process.exit()
})

module.exports = pressure