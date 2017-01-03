const Ctrl = (props) => {
  const ctrl = props.data.ctrl

  const editAo1 = () => {
    socket.emit('editAo1', "Editing ao1...")
  }

  const resetAo1 = () => {
    socket.emit('resetAo1', "Resetting ao1...")
  }

  const editAo2 = () => {
    socket.emit('editAo2', "Editing ao2...")
  }

  const resetAo2 = () => {
    socket.emit('resetAo2', "Resetting ao2...")
  }

  return (
    <div>
      <h3><span className="label label-success">Control</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>vbus</td><td>{ _.round((ctrl.vbus), 3).toFixed(3) }</td></tr>
        <tr><td>vign</td><td>{ _.round((ctrl.vign), 3).toFixed(3) }</td></tr>
        <tr><td>brd_temp</td><td>{ _.round((ctrl.brd_temp), 3).toFixed(3)}</td></tr>
        <tr><td>pwr_temp</td><td>{ _.round((ctrl.brd_temp), 3).toFixed(3)}</td></tr>
        <tr><td>vi1</td><td>{ ctrl.vi1 }</td></tr>
        <tr><td>vi2</td><td>{ ctrl.vi2 }</td></tr>
        <tr><td>vi3</td><td>{ ctrl.vi3 }</td></tr>
        <tr><td>vi4</td><td>{ ctrl.vi4 }</td></tr>
        <tr>
          <td>ao1</td><td>{ ctrl.ao1 }</td>
          <td>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Input ao1..." />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default btn-info" onClick={editAo1}>Edit</button>
                <button type="button" className="btn btn-default btn-info" onClick={resetAo1}>Reset</button>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>ao2</td><td>{ ctrl.ao2 }</td>
          <td>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Input ao2..." />
              <span className="input-group-btn">
                <button type="button" className="btn btn-default btn-info" onClick={editAo2}>Edit</button>
                <button type="button" className="btn btn-default btn-info" onClick={resetAo2}>Reset</button>
              </span>
            </div>
          </td>
        </tr>
        <tr><td>va01</td><td>{ _.round((ctrl.va01), 3).toFixed(3) }</td></tr>
        <tr><td>va02</td><td>{ _.round((ctrl.va02), 3).toFixed(3) }</td></tr>
        <tr><td>out</td><td>{ _.round((ctrl.out), 3).toFixed(3) }</td></tr>
      </tbody>
      </table>
    </div>
  )
}
