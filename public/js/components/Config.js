const Config = (props) => {
  const ctrl = props.data.ctrl

  const send = (event, flag, value, message) => {
   	socket.emit(event, flag, value, message)   		
  }

  const input = (event, flag) => {
  	const value = Number(event.target.value)
  	if (Number.isInteger(value)) {
	  	props.onChange(event.target.value, flag)
  	}
  }

  return (
    <div>

      <h3><span className="label label-success">Configuration</span></h3>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set the watchdog timeout in seconds..." value={props.value.wdtoValue} onChange={(event) => input(event, "wdto")}/>
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('setWD', props.value.wdtoValue, `Setting ao1 to ${props.value.wdtoValue} mV`)}>Save</button>
          <button type="button" className="btn btn-default btn-info" onClick={() => send('resetWD', props.value.wdtoValue, `Setting ao1 to ${props.value.wdtoValue} mV`)}>Reset</button>
        </span>
      </div>

    </div>
  )
}