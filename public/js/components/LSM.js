const LSM = (props) => {
  const gps         = props.data.gps
  const acc         = props.data.acc
  const gyro        = props.data.gyro
  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  const accOff = () => {
    socket.emit('accOff', "Turning LSM6DS3 accelerometer off ...")
  }

  const accOn = () => {
    socket.emit('accOn', "Turning LSM6DS3 accelerometer on ...")
  }

  const accSwitch = (mode) => {
    socket.emit('gyroSwitch', mode)
  }

  const gyroSwitch = (mode) => {
    socket.emit('gyroSwitch', mode)
  }

  const gyroOff = () => {
    socket.emit('gyroOff', "Turning LSM6DS3 gyroscope off ...")
  }

  const gyroOn = () => {
    socket.emit('gyroOn', "Turning LSM6DS3 gyroscope on ...")
  }

  const pressOff = () => {
    socket.emit('pressOff', "Turning LSM6DS3 pressure sensor off ...")
  }

  const pressOn = () => {
    socket.emit('pressOn', "Turning LSM6DS3 pressure sensor on ...")
  }

  const tempLSMOff = () => {
    socket.emit('tempLSMOff', "Turning LSM6DS3 temperature sensor off ...")
  }

  const tempLSMOn = () => {
    socket.emit('tempLSMOn', "Turning LSM6DS3 temperature sensor on ...")
  }

  const tempLPSOff = () => {
    socket.emit('tempLPSOff', "Turning LPS25HB temperature sensor off ...")
  }

  const tempLPSOn = () => {
    socket.emit('tempLPSOn', "Turning LPS25HB temperature sensor on ...")
  }

  return (
    <div>
      <h3><span className="label label-success">LSM3DS3</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr>
          <td>Accelerometer</td>
          <td>{ acc.x }</td>
          <td>{ acc.y }</td>
          <td>{ acc.z }</td>
          <td>
            <div className="btn-group" role="group">
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "active" : ""}`} onClick={accOn}>On</button>
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "" : "active"}`} onClick={accOff}>Off</button>              
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "active" : ""}`} onClick={accSwitch(1)}>On</button>
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "" : "active"}`} onClick={accSwitch(0)}>Off</button>
            </div>
          </td>
          <td>{`Status: ${acc.status}`}</td>
        </tr>
        <tr>
          <td>Gyroscope</td>
          <td>{ gyro.x }</td>
          <td>{ gyro.y }</td>
          <td>{ gyro.z }</td>
          <td>
            <div className="btn-group" role="group">
              <button type="button" className={`btn btn-sm btn-info ${gyro.status ? "active" : ""}`} onClick={gyroOn}>On</button>
              <button type="button" className={`btn btn-sm btn-info ${gyro.status ? "" : "active"}`} onClick={gyroOff}>Off</button>
            </div>
          </td>
          <td>{`Status: ${gyro.status}`}</td>
        </tr>
        <tr><td>Temperature (°C)</td>
          <td>{ _.round((temperature.LSM6DS3), 2).toFixed(2) }</td>
          <td></td><td></td>
          <td>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-sm btn-info" onClick={tempLSMOn}>On</button>
              <button type="button" className="btn btn-sm btn-info" onClick={tempLSMOff}>Off</button>
            </div>          
          </td>
          <td>{`Status: ${temperature.status}`}</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

/*
              <button type="button" className="btn btn-sm btn-info" onClick={accOn}>On</button>
              <button type="button" className="btn btn-sm btn-info" onClick={accOff}>Off</button>
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "active" : ""}`} onClick={() => accSwitch(1)}>On</button>
              <button type="button" className={`btn btn-sm btn-info ${acc.status ? "" : "active"}`} onClick={() => accSwitch(0)}>Off</button>
              <button type="button" className={`btn btn-sm btn-info ${temperature.status ? "active" : ""}`} onClick={tempLSMOn}>On</button>
              <button type="button" className={`btn btn-sm btn-info ${temperature.status ? "" : "active"}`} onClick={tempLSMOff}>Off</button>

*/