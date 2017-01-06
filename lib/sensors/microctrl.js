var i2c              = require("i2c-bus")
var { EventEmitter } = require('events')

var microcrtl = new EventEmitter()

var I2C_ADDR                 = 0
var MICROCTRL_ADDR           = 0x55

//Voltage and IO
var PMIC_REG_VBUS            = 0x02 //Main voltage
var PMIC_REG_VIGN            = 0x04 //Ignition voltage
var PMIC_REG_BRD_TEMP        = 0x06 //On-board Analog Temperature
var PMIC_REG_PWR_TEMP        = 0x08 //On-board Power Converter Temperature
var PMIC_REG_VI1             = 0x0A //Voltage Input 1
var PMIC_REG_VI2             = 0x0C //Voltage Input 2
var PMIC_REG_VI3             = 0x0E //Voltage Input 3
var PMIC_REG_VI4             = 0x10 //Voltage Input 4
var PMIC_REG_AO1             = 0x20 //Analog voltage output 1
var PMIC_REG_AO2             = 0x22 //Analog voltage output 2
var PMIC_REG_VAO1            = 0x24 //Feedback from analog voltage output 1
var PMIC_REG_VAO2            = 0x26 //Feedback from analog voltage output 2
var PMIC_REG_OUT             = 0x30 //Digital output register (1=SINKING Current)
// more features. to be done...
var PMIC_REG_WD              = 0x40 
var PMIC_REG_WD_TIMER        = 0x42
var PMIC_REG_WD_TIMEOUT      = 0x44
var PMIC_REG_WD_RESET        = 0x46 
var PMIC_REG_IGN             = 0x70 
var PMIC_REG_IGN_VLOW        = 0x72
var PMIC_REG_IGN_VHIGH       = 0x74
var PMIC_REG_PWRON_SRC       = 0x80 
var PMIC_REG_PWROFF_SRC_PREV = 0x81 
var PMIC_REG_PWROFF_SRC      = 0x82 
var PMIC_REG_PWROFF_STAT     = 0x83 
var PMIC_REG_PWROFF_SOFT_TO  = 0x84
var PMIC_REG_PWROFF_HARD_TO  = 0x86
var PMIC_REG_PWROFF_SOFT     = 0x88
var PMIC_REG_PWROFF_HARD     = 0x8A
var PMIC_REG_PWROFF_VLOW     = 0x8C
var PMIC_REG_PWRON_VHIGH     = 0x8E
var PMIC_REG_HWID            = 0xE0
var PMIC_REG_BLID            = 0xE4
var PMIC_REG_FWID            = 0xE8
var PMIC_REG_TIME            = 0xEC
var PMIC_REG_UUID            = 0xF0

var bus    = i2c.openSync(I2C_ADDR)
var buffer = Buffer.alloc(2, 0x00)

var getMicroctrl = () => {
  var vbusBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VBUS)
  var vignBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VIGN)
  var brd_tempBytes        = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_BRD_TEMP)
  var pwr_tempBytes        = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWR_TEMP)
  var vi1Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI1)
  var vi2Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI2)
  var vi3Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI3)
  var vi4Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VI4)
  var ao1Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO1)
  var ao2Bytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_AO2)
  var va01Bytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VAO1)
  var va02Bytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_VAO2)
  var outBytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_OUT)
  var wdBytes              = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_WD)
  var wd_timerBytes        = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_WD_TIMER)
  var wd_timeoutBytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_WD_TIMEOUT)
  var wd_resetBytes        = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_WD_RESET)
  var ignBytes             = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_IGN)
  var ign_vlowBytes        = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_IGN_VLOW)
  var ign_vhighBytes       = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_IGN_VHIGH)
  var pwron_srcBytes       = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWRON_SRC)
  var pwroff_src_prevBytes = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_SRC_PREV)
  var pwroff_srcBytes      = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_SRC)
  var pwroff_statBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_STAT)
  var pwroff_soft_toBytes  = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_SOFT_TO)
  var pwroff_hard_toBytes  = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_HARD_TO)
  var pwroff_softBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_SOFT)
  var pwroff_hardBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_HARD)
  var pwroff_vlowBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWROFF_VLOW)
  var pwron_vhighBytes     = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_PWRON_VHIGH)
  var hwidBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_HWID)
  var blidBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_BLID)
  var fwidBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_FWID)
  var timeBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_TIME)
  var uuidBytes            = bus.readWordSync(MICROCTRL_ADDR, PMIC_REG_UUID)

  var vbus            = bufferize(vbusBytes, 0) / 1000
  var vign            = bufferize(vignBytes, 0) / 1000
  var brd_temp        = bufferize(brd_tempBytes, 0) / 500
  var pwr_temp        = bufferize(pwr_tempBytes, 0) / 1000
  var vi1             = bufferize(vi1Bytes, 0) / 1000
  var vi2             = bufferize(vi2Bytes, 0) / 1000
  var vi3             = bufferize(vi3Bytes, 0) / 1000
  var vi4             = bufferize(vi4Bytes, 0) / 1000
  var ao1             = bufferize(ao1Bytes, 0)
  var ao2             = bufferize(ao2Bytes, 0) 
  var va01            = bufferize(va01Bytes, 0) / 1000
  var va02            = bufferize(va02Bytes, 0) / 1000
  var out             = bufferize(outBytes, 0)
  var wd              = bufferize(wdBytes, 0)
  var wd_timer        = bufferize(wd_timerBytes, 0)
  var wd_timeout      = bufferize(wd_timeoutBytes, 0)
  var wd_reset        = bufferize(wd_resetBytes, 0)
  var ign             = bufferize(ignBytes, 0)
  var ign_vlow        = bufferize(ign_vlowBytes, 0)
  var ign_vhigh       = bufferize(ign_vhighBytes, 0)
  var pwron_src       = bufferize(pwron_srcBytes, 0)
  var pwroff_src_prev = bufferize(pwroff_src_prevBytes, 0)
  var pwroff_src      = bufferize(pwroff_srcBytes, 0)
  var pwroff_stat     = bufferize(pwroff_statBytes, 0)
  var pwroff_soft_to  = bufferize(pwroff_soft_toBytes, 0)
  var pwroff_hard_to  = bufferize(pwroff_hard_toBytes, 0)
  var pwroff_soft     = bufferize(pwroff_softBytes, 0)
  var pwroff_hard     = bufferize(pwroff_hardBytes, 0)
  var pwroff_vlow     = bufferize(pwroff_vlowBytes, 0)
  var pwron_vhigh     = bufferize(pwron_vhighBytes, 0)
  var hwid            = bufferize(hwidBytes, 0)
  var blid            = bufferize(blidBytes, 0)
  var fwid            = bufferize(fwidBytes, 0)
  var time            = bufferize(timeBytes, 0)
  var uuid            = bufferize(uuidBytes, 0)

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
    out: out,

    // wd: wd,
    // wd_timer: wd_timer,
    // wd_timeout: wd_

  })
}

setInterval(getMicroctrl, 1000)

process.on("SIGINT", function(cb) {
  bus.closeSync()
  return process.exit()
})

var bufferize = (bytes, offset) => {
  buffer.writeUInt16BE(bytes, offset)
  return buffer.readInt16BE(offset)
}

module.exports = microcrtl
