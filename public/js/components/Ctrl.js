const Ctrl = (props) => {
  const ctrl = props.data.ctrl

  var state = {value: ''}

  const writeAO1 = () => {
    socket.emit('writeAO1', "Writing ao1")
  }

  const writeAO2 = () => {
    socket.emit('writeAO2', "Writing ao2")
  }

  return (
    <div>
      <h3><span className="label label-success">PMIC</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>vbus (V)</td><td>{ _.round((ctrl.vbus), 2).toFixed(2) }</td></tr>
        <tr><td>vign (V)</td><td>{ _.round((ctrl.vign), 2).toFixed(2) }</td></tr>
        <tr><td>brd_temp (°C)</td><td>{ _.round((ctrl.brd_temp), 2).toFixed(2)}</td></tr>
        <tr><td>pwr_temp (°C)</td><td>{ _.round((ctrl.pwr_temp), 2).toFixed(2)}</td></tr>
        <tr><td>vi1 (V)</td><td>{ _.round((ctrl.vi1), 2).toFixed(2) }</td></tr>
        <tr><td>vi2 (V)</td><td>{ _.round((ctrl.vi2), 2).toFixed(2) }</td></tr>
        <tr><td>vi3 (V)</td><td>{ _.round((ctrl.vi3), 2).toFixed(2) }</td></tr>
        <tr><td>vi4 (V)</td><td>{ _.round((ctrl.vi4), 2).toFixed(2) }</td></tr>
        <tr><td>ao1 (mV)</td><td>{ ctrl.ao1 }</td></tr>
        <tr><td>ao2 (mV)</td><td>{ ctrl.ao2 }</td></tr>
        <tr><td>va01 (V)</td><td>{ _.round((ctrl.va01), 2).toFixed(2) }</td></tr>
        <tr><td>va02 (V)</td><td>{ _.round((ctrl.va02), 2).toFixed(2) }</td></tr>
        <tr><td>out (V)</td><td>{ _.round((ctrl.out), 2).toFixed(2) }</td></tr>
      </tbody>
      </table>
    </div>
  )
}