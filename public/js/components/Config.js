const Config = (props) => {
  const ctrl = props.data.ctrl

  const save = (event, value, message) => {
   	socket.emit(event, value, message)   		
  }

  var inputAO1 = (event) => {
  	const value = Number(event.target.value)
  	if (Number.isInteger(value)) {
	  	props.onChange(event.target.value)
  	}
  }

  return (
    <div>

      <h3><span className="label label-success">Configuration</span></h3>

      <div className="input-group">
      <input type="text" className="form-control" placeholder="Input an integer between 0 and 9000 to set ao1..." value={props.value} onChange={inputAO1} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => save('saveAO1', props.value, `Saving ao1 to ${props.value} mV`)}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="Input an integer between 0 and 9000 to set ao2..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('saveAO2', "Saving ao2...")}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vlow..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('saveVlow', "Saving vlow...")}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vhigh..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('saveVhigh', "Saving vhigh...")}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set the watchdog timeout in seconds..." />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('setWD', "Setting watchdog...")}>Set</button>
          <button type="button" className="btn btn-default btn-info" onClick={() => send('enableWD', "Enabling watchdog...")}>Enable</button>
          <button type="button" className="btn btn-default btn-info" onClick={() => send('disableWD', "Disabling watchdog...")}>Disable</button>
          <button type="button" className="btn btn-default btn-info" onClick={() => send('resetWD', "Resetting watchdog...")}>Reset</button>
        </span>
      </div>

  	  <div className="input-group">
	    <button type="button" className="btn btn-default btn-info" onClick={() => send('saveToEEPROM', "Saving to EEPROM...")}>Save to EEPROM</button>
	    <button type="button" className="btn btn-default btn-info" onClick={() => send('restoreFromEEPROM', "Restoring from EEPROM...")}>Restore from EEPROM</button>
	  </div>

    </div>
  )
}

/*
      <input type="text" className="form-control" placeholder="set ao1..." value={props.value} onChange={handleChange} />
      <button type="button" className="btn btn-default btn-info" onClick={() => send('saveAO1', "Saving ao1...") }>Save</button>
   	  socket.emit('handleChange', event.target.value)
*/