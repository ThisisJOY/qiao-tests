const LPS = (props) => {

  const pressure    = props.data.pressure
  const temperature = props.data.temperature

  return (
    <div>
      <h3><span className="label label-success">LPS25HB</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>Pressure</td><td>{ _.ceil(pressure.pressure) }</td></tr>
        <tr><td>Temperature (°C)</td><td>{ _.round((temperature.LPS25HB), 2).toFixed(2) }</td></tr>
      </tbody>
      </table>
    </div>
  )
}
