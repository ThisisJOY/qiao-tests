var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var temperature = new EventEmitter()

var I2C_ADDR              = 0
var LPS25HB_ADDR          = 0x5D
var LSM6DS3_ADDR          = 0x6B
var LPS25HB_TEMP_REGISTRY = { lsb: 0x2B, msb: 0x2C }
var LSM6DS3_TEMP_REGISTRY = 0x20

var bus    = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(2, 0x00)

var getTemperature = () => {
  var LPS25HB_res = bus.readWordSync(LPS25HB_ADDR, LPS25HB_TEMP_REGISTRY.lsb | 0x80)
  buffer.writeUInt16BE(LPS25HB_res, 0)
  var tempLPS = (buffer.readInt16BE(0)) / 480.0

  var LSM6DS3_res = bus.readWordSync(LSM6DS3_ADDR, LSM6DS3_TEMP_REGISTRY)
  buffer.writeUInt16BE(LSM6DS3_res, 0)
  var tempLSM = buffer.readInt16BE(0);

  temperature.emit("new_temperature", {
    LPS25HB: tempLPS,
    LSM6DS3: tempLSM
  })
}

setInterval(getTemperature, 1000)

process.on("SIGINT", function(cb) {
  bus.closeSync()
  return process.exit()
})

module.exports = temperature