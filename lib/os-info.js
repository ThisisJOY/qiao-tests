var os 		         = require('os')
var { EventEmitter } = require('events')
var disk 		  	 = require('diskusage')

var osInfo = new EventEmitter()

var data = {}

data.hostname		   = os.hostname()
data.arch			   = os.arch()
data.cpus     		   = os.cpus()
data.freemem  		   = os.freemem()
data.totalmem 		   = os.totalmem()
data.loadavg  		   = os.loadavg()
data.networkInterfaces = os.networkInterfaces()
data.platform		   = os.platform()
data.release		   = os.release()
data.type			   = os.type()
data.uptime            = os.uptime()

disk.check('/', (err, info) => {
    data.availdisk = info.available
    data.freedisk  = info.free
    data.totaldisk = info.total
})

var getInfo = () => {
	osInfo.emit('data', data)
}

setInterval(getInfo, 1000)

module.exports = osInfo