const Ctrl = (props) => {
  const ctrl = props.data.ctrl

  var state = {value: ''}

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

  const handleChange = (event) => {
    socket.emit('handleChange', event.target.value)
    // this.setState({value: event.target.value})
  }

  const handleSubmit = (event) => {
    socket.emit('handleSubmit', state.value)
    // alert('A name was submitted: ' + state.value)
    // event.preventDefault()
  }

  return (
    <div>
      <h3><span className="label label-success">Control</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>vbus (V)</td><td>{ _.round((ctrl.vbus), 2).toFixed(2) }</td></tr>
        <tr><td>vign (V)</td><td>{ _.round((ctrl.vign), 2).toFixed(2) }</td></tr>
        <tr><td>brd_temp (°C)</td><td>{ _.round((ctrl.brd_temp), 2).toFixed(2)}</td></tr>
        <tr><td>pwr_temp (°C)</td><td>{ _.round((ctrl.brd_temp), 2).toFixed(2)}</td></tr>
        <tr><td>vi1 (V)</td><td>{ _.round((ctrl.vi1 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>vi2 (V)</td><td>{ _.round((ctrl.vi2 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>vi3 (V)</td><td>{ _.round((ctrl.vi3 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>vi4 (V)</td><td>{ _.round((ctrl.vi4 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>ao1 (V)</td><td>{ ctrl.ao1 }</td></tr>
        <tr><td>ao2 (V)</td><td>{ ctrl.ao2 }</td></tr>
        <tr><td>va01 (V)</td><td>{ _.round((ctrl.va01 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>va02 (V)</td><td>{ _.round((ctrl.va02 / 1000), 2).toFixed(2) }</td></tr>
        <tr><td>out</td><td>{ _.round((ctrl.out / 1000), 2).toFixed(2) }</td></tr>
      </tbody>
      </table>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Input ao1..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={editAo1}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={resetAo1}>Reset</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Input ao2..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={editAo2}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={resetAo2}>Reset</button>
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          ao1: 
          <input type="text" value={state.value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}

/*
      <form onSubmit={handleSubmit}>
        <label>
          ao1: 
          <input type="text" value={state.value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
*/
