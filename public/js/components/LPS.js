const LPS = (props) => {

  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  const pressOff = () => {
    socket.emit('pressOff', "Turning pressure sensor off ...")
  }

  const pressOn = () => {
    socket.emit('pressOn', "Turning pressure sensor on ...")
  }

  const tempLPSOff = () => {
    socket.emit('tempLPSOff', "Turning temperature LPS25HB sensor off ...")
  }

  const tempLPSOn = () => {
    socket.emit('tempLPSOn', "Turning temperature LPS25HB sensor on ...")
  }

  return (
    <div>
      <h3><span className="label label-success">LPS25HB</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr>
	        <td>Pressure</td>
	        <td>{ _.ceil(pressure.pressure) }</td>
	        <td></td>
	        <td>
	          <div className="btn-group" role="group">
	            <button type="button" className="btn btn-sm btn-info" onClick={pressOn}>On</button>
	            <button type="button" className="btn btn-sm btn-info" onClick={pressOff}>Off</button>
	          </div>
	        </td>
          <td>{`Status: ${pressure.status}`}</td>
        </tr>
        <tr><td>Temperature (°C)</td>
        <td>{ _.round((temperature.LPS25HB), 2).toFixed(2) }</td>
        <td></td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-sm btn-info" onClick={tempLPSOn}>On</button>
            <button type="button" className="btn btn-sm btn-info" onClick={tempLPSOff}>Off</button>
          </div>          
        </td>
        <td>{`Status: ${temperature.status}`}</td>
        </tr>

      </tbody>
      </table>
    </div>
  )
}

              // <button type="button" className={`btn btn-sm btn-info ${acc.status ? "active" : ""}`} onClick={pressOn}>On</button>
              // <button type="button" className={`btn btn-sm btn-info ${acc.status ? "" : "active"}`} onClick={pressOff}>Off</button>
