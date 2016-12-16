var Serialport       = require('serialport')
var nmea             = require('nmea-0183')
var { EventEmitter } = require('events')

var gps        = new EventEmitter()
var serialport = new Serialport('/dev/ttymxc3', {
	baudrate: 9600,
	parser:   Serialport.parsers.readline('\r\n')
})

serialport.on('data', (data) => {
	if (data.indexOf('$GPRMC') === 0) {
		gps.emit('data', { type: 'gprmc', data: nmea.parse(data)})
	} else if (data.indexOf('$GPGGA') === 0) {
		gps.emit('data', { type: 'gpgga', data: nmea.parse(data)})
	}
})

module.exports = gps