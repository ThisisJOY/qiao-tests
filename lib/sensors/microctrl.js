var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var microcrtl = new EventEmitter()

var I2C_ADDR          = 0
var MICROCTRL_ADDR    = 0x55
var PMIC_REG_VBUS     = 0x02
var PMIC_REG_VIGN     = 0x04
var PMIC_REG_BRD_TEMP = 0x06
var PMIC_REG_PWR_TEMP = 0x08
var PMIC_REG_VI1      = 0x0A
var PMIC_REG_VI2      = 0x0C
var PMIC_REG_VI3      = 0x0E
var PMIC_REG_VI4      = 0x10
var PMIC_REG_AO1      = 0x12
var PMIC_REG_AO2      = 0x14
var PMIC_REG_VAO1     = 0x16
var PMIC_REG_VAO2     = 0x18
var PMIC_REG_OUT      = 0x1A

var bus    = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(2, 0x00)

var getMicroctrl = () => {
  var vbusBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VBUS)
  var vignBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VIGN)
  var brd_tempBytes = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_BRD_TEMP)
  var pwr_tempBytes = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWR_TEMP)
  var vi1Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI1)
  var vi2Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI2)
  var vi3Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI3)
  var vi4Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI4)
  var ao1Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO1)
  var ao2Bytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO2)
  var va01Bytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VAO1)
  var va02Bytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VAO2)
  var outBytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_OUT)

  var vbus     = (bufferize(vbusBytes, 0)) / 1000
  var vign     = (bufferize(vignBytes, 0)) / 1000
  var brd_temp = (bufferize(brd_tempBytes, 0)) / 500
  var pwr_temp = (bufferize(pwr_tempBytes, 0)) / 500
  var vi1      = bufferize(vi1Bytes, 0)
  var vi2      = bufferize(vi2Bytes, 0)
  var vi3      = bufferize(vi3Bytes, 0)
  var vi4      = bufferize(vi4Bytes, 0)
  var ao1      = bufferize(ao1Bytes, 0)
  var ao2      = bufferize(ao2Bytes, 0)
  var va01     = (bufferize(va01Bytes, 0)) / 1000
  var va02     = (bufferize(va02Bytes, 0)) / 1000
  var out      = bufferize(outBytes, 0)

  microcrtl.emit("new_data", {
    vbus: vbus,
    vign: vign,
    brd_temp: brd_temp,
    pwr_temp: pwr_temp,
    vi1: vi1,
    vi2: vi2,
    vi3: vi3,
    vi4: vi4,
    ao1: ao1,
    ao2: ao2,
    va01: va01,
    va02: va02,
    out: out
  })
}

setInterval(getMicroctrl, 1000)

var bufferize = (bytes, offset) => {
  buffer.writeUInt16BE(bytes, offset)
  return buffer.readInt16BE(offset)
}

module.exports = microcrtl
