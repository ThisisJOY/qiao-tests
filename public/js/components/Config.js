const Config = (props) => {
  const ctrl = props.data.ctrl
  // remember to use only one function with arguments to implement the following...

  // ao1
  const saveAO1 = () => {
    socket.emit('saveAO1', "Saving ao1")
  }

  const restoreAO1 = () => {
    socket.emit('restoreAO1', "Restoring ao1")
  }

  // ao2
  const saveAO2 = () => {
    socket.emit('saveAO2', "Saving ao2")
  }

  const restoreAO2 = () => {
    socket.emit('restoreAO1', "Restoring ao2")
  }

  // vlow
  const saveVlow = () => {
    socket.emit('saveVlow', "Saving vlow")
  }

  const restoreVlow = () => {
    socket.emit('restoreVlow', "Restoring vlow")
  }

  // vhigh
  const saveVhigh = () => {
    socket.emit('saveVhigh', "Saving vhigh")
  }

  const restoreVhigh = () => {
    socket.emit('restoreVhigh', "Restoring vhigh")
  }

  // watchdog
  const setWD = () => {
    socket.emit('setWD', "Setting watchdog")
  }

  const enableWD = () => {
    socket.emit('enableWD', "Enabling watchdog")
  }

  const disableWD = () => {
    socket.emit('disableWD', "Disabling watchdog")
  }

  const resetWD = () => {
    socket.emit('resetWD', "Resetting watchdog")
  }

  const saveToEEPROM = () => {
    socket.emit('saveToEEPROM', "Saving current settings to EEPROM")
  }

  const restoreFromEEPROM = () => {
    socket.emit('restoreFromEEPROM', "Restoring settings from EEPROM")
  }


  const handleChange = (event) => {
    socket.emit('handleChange', event.target.value)
    // this.setState({value: event.target.value})
  }

  // const handleSubmit = (event) => {
  //   socket.emit('handleSubmit', state.value)
  //   // alert('A name was submitted: ' + state.value)
  //   // event.preventDefault()
  // }

  var state = {
  	value: ''
  }
  
  return (
    <div>

      <h3><span className="label label-success">Configuration</span></h3>

      <div className="input-group">
      <input type="text" className="form-control" placeholder="set ao1..." value={state.value} onChange={handleChange} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={saveAO1}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={restoreAO1}>Restore</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set ao2..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={saveAO2}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={restoreAO2}>Restore</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vlow..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={saveVlow}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={restoreVlow}>Restore</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vhigh..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={saveVhigh}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={restoreVhigh}>Restore</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set the watchdog timeout in seconds..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={setWD}>Set</button>
          <button type="button" className="btn btn-default btn-info" onClick={enableWD}>Enable</button>
          <button type="button" className="btn btn-default btn-info" onClick={disableWD}>Disable</button>
          <button type="button" className="btn btn-default btn-info" onClick={resetWD}>Reset</button>
        </span>
      </div>

  	  <div className="input-group">
	    <button type="button" className="btn btn-default btn-info" onClick={saveToEEPROM}>Save to EEPROM</button>
	    <button type="button" className="btn btn-default btn-info" onClick={restoreFromEEPROM}>Restore from EEPROM</button>
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

	  <div className="input-group">
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={writeAO2}>Save settings to EEPROM</button>
          <button type="button" className="btn btn-default btn-info" onClick={writeAO2}>Restore settings from EEPROM</button>
        </span>
      </div>
*/