// const socket = window.io.connect('http://localhost:3000')
const socket = io.connect('http://192.168.1.25:3000')

const { Component } = React

const Navigation = () => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">IVH2 Stats</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>  
)

const OsInfo = (props) => {

  return (
    <div>
      <table className="table table-striped table-condensed">
        <thead>
          <h3><span className="label label-success">System</span></h3>
        </thead>
        <tbody>
          <tr><td>Hostname</td><td>{ props.data.hostname }</td></tr>
          <tr><td>Arch</td><td>{ props.data.arch }</td></tr>
          <tr><td>Platform</td><td>{ props.data.type }</td></tr>
          <tr><td>Release</td><td>{ props.data.release }</td></tr>
          <tr><td>Uptime (s)</td><td>{ props.data.uptime }</td></tr>

          {
            props.data.cpus
              ? props.data.cpus.map((cpu, i) => <tr><td>Cpu {i + 1}</td><td>{ cpu.model }</td></tr>)
              : <tr><td>Cpu</td><td>No CPUs detected</td></tr>
          }

        </tbody>
      </table>
    </div>
  )
}

const LoadAverage = (props) => {
  const loadAverage = props.data.loadavg ? props.data.loadavg.map((i) => `${_.ceil(i * 100)}`) : [0, 0, 0]

  const firstPer    = loadAverage[0]     ? `c100 p${loadAverage[0]}`        : "c100 p0"
  const sencondPer  = loadAverage[1]     ? `c100 p${loadAverage[1]} green`  : "c100 p0 green"
  const thirdPer    = loadAverage[2]     ? `c100 p${loadAverage[2]} orange` : "c100 p0 orange"

  return (
    <div>
      <h3><span className="label label-success">Load Average</span></h3>
      <h5>1 min / 5 min / 15 min</h5>
        <div className="clearfix">  
              <div className={ firstPer }>
                  <span>{ `${loadAverage[0]}%` }</span>
                  <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                  </div>
              </div>

            <div className={ sencondPer }>
              <span>{ `${loadAverage[1]}%` }</span>
              <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
             </div>
            </div>
            <div className={ thirdPer }>
              <span>{ `${loadAverage[2]}%` }</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
      </div>
    </div>
  )
}

const Network = (props) => {
  const networkInterfaces = props.data.networkInterfaces ? props.data.networkInterfaces : {}
  return (
    <div>
      <table className="table table-striped table-condensed">
        <thead>
          <h3><span className="label label-success">Network</span></h3>
          <tr><th>Interfaces</th><th>Address</th></tr>
        </thead>
        <tbody>
          { networkInterfaces.eth0
            ? networkInterfaces.eth0.map((eth0, i) => <tr><td>eth0 {i + 1}</td><td>{ eth0.address }</td></tr>)
            :<tr><td>eth0</td><td>No eth0 detected</td></tr>
          }
          { networkInterfaces.lo
            ? networkInterfaces.lo.map((lo, i) => <tr><td>lo {i + 1}</td><td>{ lo.address }</td></tr>)
            :<tr><td>lo</td><td>No lo detected</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

const Memory = (props) => {
  const totalMem          = _.ceil(props.data.totalmem / ( 1024 * 1024 ))
  const freeMem           = _.ceil(props.data.freemem / ( 1024 * 1024 ))
  const freeMemPercentage = _.ceil(100 * freeMem / totalMem)
  const usedMemPercentage = _.ceil(100 * (totalMem - freeMem) / totalMem)

  return (
    <div>
      <h3><span className="label label-success">Memory</span></h3>
      <table className="table table-striped table-condensed">
      <thead><th>Use %</th><th></th><th>Used</th><th>Free</th><th>Total</th></thead>
      <tbody>
        <tr>
        <td>
          <div className="progress">
            <div className="progress-bar progress-bar-warning" style={{width: `${usedMemPercentage}%`}}>{usedMemPercentage}%</div>
          </div>
        </td>
        <td></td>
        <td>{ totalMem - freeMem } MB</td>
        <td>{ freeMem } MB</td>
        <td>{ totalMem } MB</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

const Disk = (props) => {
  const totalDisk          = _.ceil(props.data.totaldisk / ( 1024 * 1024 ))
  const freeDisk           = _.ceil(props.data.freedisk / ( 1024 * 1024 ))
  const freeDiskPercentage = _.ceil(100 * freeDisk / totalDisk)
  const usedDiskPercentage = _.ceil(100 * (totalDisk - freeDisk) / totalDisk)

  return (
    <div>
      <h3><span className="label label-success">Disk</span></h3>
      <table className="table table-striped table-condensed">
      <thead><th>Use %</th><th></th><th>Used</th><th>Free</th><th>Total</th></thead>
      <tbody>
        <tr>
        <td>
          <div className="progress">
            <div className="progress-bar progress-bar-warning" style={{width: `${usedDiskPercentage}%`}}>{usedDiskPercentage}%</div>
          </div>
        </td>
        <td></td>
        <td>{ totalDisk - freeDisk } MB</td>
        <td>{ freeDisk } MB</td>
        <td>{ totalDisk } MB</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

const Sensors = (props) => {
  const gps         = props.data.gps
  const acc         = props.data.acc
  const gyro        = props.data.gyro
  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  const accOff = () => {
    socket.emit('accOff', "Turning accelerometer off...")
  }

  const accOn = () => {
    socket.emit('accOn', "Turning accelerometer on...")
  }

  return (
    <div>
      <div>
        <button onClick={accOn}>On</button>
        <button onClick={accOff}>Off</button>
      </div>

      <h3><span className="label label-success">Sensors</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>Accelerometer</td><td>{ acc.x }</td><td>{ acc.y }</td><td>{ acc.z }</td></tr>
        <tr><td>Gyroscope</td><td>{ gyro.x }</td><td>{ gyro.y }</td><td>{ gyro.z }</td></tr>
        <tr><td>Pressure</td><td>{ pressure.pressure }</td><td></td><td></td></tr>
        <tr><td>Temperature</td><td>LPS25HB: { temperature.LPS25HB }</td><td>LSM6DS3: { temperature.LSM6DS3 }</td><td></td></tr>
      </tbody>
      </table>

    </div>
  )

}

const Ctrl = (props) => {
  const ctrl = props.data.ctrl

  const onEditClick = () => {
    console.log("ctrl")
    // ctrl = {
    //   ao1: 1800 
    // }
  }

  return (
    <div>
      <div>
        <button onClick={onEditClick}>On</button>
        <button>Off</button>
      </div>
      <h3><span className="label label-success">Control</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>vbus</td><td>{ ctrl.vbus }</td></tr>
        <tr><td>vign</td><td>{ ctrl.vign }</td></tr>
        <tr><td>brd_temp</td><td>{ ctrl.brd_temp }</td></tr>
        <tr><td>pwr_temp</td><td>{ ctrl.pwr_temp }</td></tr>
        <tr><td>vi1</td><td>{ ctrl.vbus }</td></tr>
        <tr><td>vi2</td><td>{ ctrl.vi2 }</td></tr>
        <tr><td>vi3</td><td>{ ctrl.vi3 }</td></tr>
        <tr><td>vi4</td><td>{ ctrl.vi4 }</td></tr>
        <tr><td>ao1</td><td>{ ctrl.ao1 }</td></tr>
        <tr><td>ao2</td><td>{ ctrl.ao2 }</td></tr>
        <tr><td>va01</td><td>{ ctrl.va01 }</td></tr>
        <tr><td>va02</td><td>{ ctrl.va02 }</td></tr>
        <tr><td>out</td><td>{ ctrl.out }</td></tr>
      </tbody>
      </table>
    </div>
  )
}

const Gps = (props) => {
  const gps   = props.data.gps
  const gpgga = gps.gpgga ? gps.gpgga : {} 
  const gprmc = gps.gprmc ? gps.gprmc : {}

  return (
    <div>
     <h3><span className="label label-success">GPS</span></h3>
      <table className="table table-striped table-condensed">
      <thead>
        <tr><th></th><th>GPGGA</th><th>GPRMC</th></tr>
      </thead>
      <tbody>
        <tr><td>Time</td><td>{ gpgga.time }</td><td>{ gprmc.time }</td></tr>
        <tr><td>Latitude</td><td>{ gpgga.latitude }</td><td>{ gprmc.latitude }</td></tr>
        <tr><td>Longitude</td><td>{ gpgga.longitude }</td><td>{ gprmc.longitude }</td></tr>
      </tbody>
      </table>            
    </div>
  )
}


class App extends Component {

  state = { 
    gps: {},
    os: {},
    acc: {},
    gyro: {},
    ctrl: {},
    pressure: {},
    temperature: {} 
  }

  componentDidMount = () => {
    socket.on('state', (data) => {
      this.setState(data)
    })  

  }

  render = () => {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <OsInfo data={this.state.os} />
              <Sensors data={this.state} />
            </div>
            <div className="col-md-6">
              <Ctrl data={this.state} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <LoadAverage data={this.state.os} />
            </div>
            <div className="col-md-6">
              <Network data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Memory data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Disk data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Gps data={this.state} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}