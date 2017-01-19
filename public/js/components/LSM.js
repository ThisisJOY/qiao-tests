const LSM = (props) => {
  const gps         = props.data.gps
  const acc         = props.data.acc
  const gyro        = props.data.gyro
  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  const switches = (flag, mode) => {
    socket.emit('switches', flag, mode)
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
              <button type="button" className={`btn btn-xs btn-info ${acc.status ? "active" : ""}`} onClick={() => switches("acc", 1)}>On</button>
              <button type="button" className={`btn btn-xs btn-info ${acc.status ? "" : "active"}`} onClick={() => switches("acc", 0)}>Off</button>
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
              <button type="button" className={`btn btn-xs btn-info ${gyro.status ? "active" : ""}`} onClick={() => switches("gyro", 1)}>On</button>
              <button type="button" className={`btn btn-xs btn-info ${gyro.status ? "" : "active"}`} onClick={() => switches("gyro", 0)}>Off</button>
            </div>
          </td>
        </tr>
        <tr><td>Temperature (°C)</td>
            <td>{ _.round((temperature.LSM6DS3), 2).toFixed(2) }</td>
            <td></td><td></td><td></td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}