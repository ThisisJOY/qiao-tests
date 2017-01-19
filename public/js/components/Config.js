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
      <input type="text" className="form-control" placeholder="set analog output 1..." value={props.value.ao1Value} onChange={(event) => input(event, "ao1")} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('save', "ao1", props.value.ao1Value, `Setting ao1 to ${props.value.ao1Value} mV`)}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set analog output 2..." value={props.value.ao2Value} onChange={(event) => input(event, "ao2")} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('save', "ao2", props.value.ao2Value, `Setting ao2 to ${props.value.ao2Value} mV`)}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vlow..." value={props.value.vlowValue} onChange={(event) => input(event, "vlow")}/>
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('save', "vlow", props.value.vlowValue, `Setting pwroff_vlow to ${props.value.vlowValue} mV`)}>Save</button>
        </span>
      </div>

      <div className="input-group">
        <input type="text" className="form-control" placeholder="set vhigh..." value={props.value.vhighValue} onChange={(event) => input(event, "vhigh")}/>
        <span className="input-group-btn">
          <button type="button" className="btn btn-default btn-info" onClick={() => send('save', "vhigh", props.value.vhighValue, `Setting pwron_vhigh to ${props.value.vhighValue} mV`)}>Save</button>
        </span>
      </div>

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