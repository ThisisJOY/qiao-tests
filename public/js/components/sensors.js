const Sensors = (props) => {
  const gps         = props.data.gps
  const acc         = props.data.acc
  const gyro        = props.data.gyro
  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  const accOff = () => {
    socket.emit('accOff', "Turning accelerometer off ...")
  }

  const accOn = () => {
    socket.emit('accOn', "Turning accelerometer on ...")
  }

  const gyroOff = () => {
    socket.emit('gyroOff', "Turning gyroscope off ...")
  }

  const gyroOn = () => {
    socket.emit('gyroOn', "Turning gyroscope on ...")
  }

  const pressOff = () => {
    socket.emit('pressOff', "Turning pressure sensor off ...")
  }

  const pressOn = () => {
    socket.emit('pressOn', "Turning pressure sensor on ...")
  }

  const tempLSMOff = () => {
    socket.emit('tempLSMOff', "Turning temperature LSM6DS3 sensor off ...")
  }

  const tempLSMOn = () => {
    socket.emit('tempLSMOn', "Turning temperature LSM6DS3 sensor on ...")
  }

  const tempLPSOff = () => {
    socket.emit('tempLPSOff', "Turning temperature LPS25HB sensor off ...")
  }

  const tempLPSOn = () => {
    socket.emit('tempLPSOn', "Turning temperature LPS25HB sensor on ...")
  }

  return (
    <div>
      <h3><span className="label label-success">Sensors</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr>
          <td>Accelerometer</td>
          <td>{ acc.x }</td>
          <td>{ acc.y }</td>
          <td>{ acc.z }</td>
          <td>
            <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-info" onClick={accOn}>On</button>
            <button type="button" className="btn btn-sm btn-info" onClick={accOff}>Off</button>
          </div>
          </td>
        </tr>
        <tr>
          <td>Gyroscope</td>
          <td>{ gyro.x }</td>
          <td>{ gyro.y }</td>
          <td>{ gyro.z }</td>
          <td>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-sm btn-info" onClick={gyroOn}>On</button>
              <button type="button" className="btn btn-sm btn-info" onClick={gyroOff}>Off</button>
            </div>
          </td>
        </tr>
        <tr>
        <td>Pressure</td>
        <td>{ _.ceil(pressure.pressure) }</td>
        <td></td><td></td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-info" onClick={pressOn}>On</button>
            <button type="button" className="btn btn-sm btn-info" onClick={pressOff}>Off</button>
          </div>
        </td>
        </tr>
        <tr><td>Temperature LSM6DS3 (°C)</td>
        <td>{ _.round((temperature.LSM6DS3), 2).toFixed(2) }</td>
        <td></td><td></td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-info" onClick={tempLSMOn}>On</button>
            <button type="button" className="btn btn-sm btn-info" onClick={tempLSMOff}>Off</button>
          </div>          
        </td>
        </tr>
        <tr><td>Temperature LPS25HB (°C)</td>
        <td>{ _.round((temperature.LPS25HB), 2).toFixed(2) }</td>
        <td></td><td></td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-info" onClick={tempLPSOn}>On</button>
            <button type="button" className="btn btn-sm btn-info" onClick={tempLPSOff}>Off</button>
          </div>          
        </td>
        </tr>

      </tbody>
      </table>
    </div>
  )
}
