const Ctrl = (props) => {
  const ctrl = props.data.ctrl

  var state = {value: ''}

  const writeAO1 = () => {
    socket.emit('writeAO1', "Writing ao1...")
  }

  const readAO1 = () => {
    socket.emit('readAO1', "Reading ao1...")
  }

  const writeAO2 = () => {
    socket.emit('writeAO2', "Writing ao2...")
  }

  const readAO2 = () => {
    socket.emit('readAO2', "Reading ao2...")
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
        <tr><td>pwr_temp (°C)</td><td>{ _.round((ctrl.pwr_temp), 2).toFixed(2)}</td></tr>
        <tr><td>vi1 (V)</td><td>{ _.round((ctrl.vi1), 2).toFixed(2) }</td></tr>
        <tr><td>vi2 (V)</td><td>{ _.round((ctrl.vi2), 2).toFixed(2) }</td></tr>
        <tr><td>vi3 (V)</td><td>{ _.round((ctrl.vi3), 2).toFixed(2) }</td></tr>
        <tr><td>vi4 (V)</td><td>{ _.round((ctrl.vi4), 2).toFixed(2) }</td></tr>
        <tr><td>ao1 (V)</td><td>{ ctrl.ao1 }</td></tr>
        <tr><td>ao2 (V)</td><td>{ ctrl.ao2 }</td></tr>
        <tr><td>va01 (V)</td><td>{ _.round((ctrl.va01), 2).toFixed(2) }</td></tr>
        <tr><td>va02 (V)</td><td>{ _.round((ctrl.va02), 2).toFixed(2) }</td></tr>
        <tr><td>out</td><td>{ _.round((ctrl.out / 1000), 2).toFixed(2) }</td></tr>
      </tbody>
      </table>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Input ao1..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={writeAO1}>Write</button>
          <button type="button" className="btn btn-default btn-info" onClick={readAO1}>Read</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Input ao2..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={writeAO2}>Write</button>
          <button type="button" className="btn btn-default btn-info" onClick={readAO2}>Read</button>
        </span>
      </div>

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
