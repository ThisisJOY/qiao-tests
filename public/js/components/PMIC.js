const PMIC = (props) => {
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

  const switches = (flag, mode) => {
    socket.emit('switches', flag, mode)
  }

  return (
    <div>
      <h3><span className="label label-success">PMIC</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr>
            <td>Analog output 1 (mV)</td>
            <td>{ ctrl.ao1 }</td> 
            <td>    
                <div className="input-group ">
                    <input type="text" className="form-control input-xs" placeholder="set analog output 1" value={props.value.ao1Value} onChange={(event) => input(event, "ao1")} />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-xs btn-info" onClick={() => send('save', "ao1", props.value.ao1Value, `Setting ao1 to ${props.value.ao1Value} mV`)}>Save</button>
                    </span>
                </div>
            </td>
        </tr>

        <tr>
            <td>Analog output 2 (mV)</td>
            <td>{ ctrl.ao2 }</td> 
            <td>    
                <div className="input-group ">
                    <input type="text" className="form-control input-xs" placeholder="set analog output 2" value={props.value.ao2Value} onChange={(event) => input(event, "ao2")} />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-xs btn-info" onClick={() => send('save', "ao2", props.value.ao2Value, `Setting ao1 to ${props.value.ao2Value} mV`)}>Save</button>
                    </span>
                </div>
            </td>
        </tr>

        <tr>
            <td>pwroff_vlow</td>
            <td>{ ctrl.pwroff_vlow }</td> 
            <td>    
                <div className="input-group">
                    <input type="text" className="form-control input-xs" placeholder="set vlow" value={props.value.vlowValue} onChange={(event) => input(event, "vlow")}/>
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-xs btn-info" onClick={() => send('save', "vlow", props.value.vlowValue, `Setting pwroff_vlow to ${props.value.vlowValue} mV`)}>Save</button>
                    </span>
                </div>
            </td>
        </tr>

        <tr>
            <td>pwron_vhigh</td>
            <td>{ ctrl.pwron_vhigh }</td>
            <td>
                <div className="input-group">
                    <input type="text" className="form-control input-xs" placeholder="set vhigh" value={props.value.vhighValue} onChange={(event) => input(event, "vhigh")}/>
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-xs btn-info" onClick={() => send('save', "vhigh", props.value.vhighValue, `Setting pwron_vhigh to ${props.value.vhighValue} mV`)}>Save</button>
                    </span>
                </div>
            </td>
        </tr>

        <tr><td>Board Temp (°C)</td><td>{ ctrl.brd_temp }</td><td></td></tr>

        <tr><td>PDie Temp (°C)</td><td>{ _.round((ctrl.pwr_temp), 2).toFixed(2)}</td><td></td></tr>

        <tr><td>DA 1 (V)</td><td>{ _.round((ctrl.va01), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>DA 2 (V)</td><td>{ _.round((ctrl.va02), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>Battery (V)</td><td>{ _.round((ctrl.vbus), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>IO 1 (V)</td><td>{ _.round((ctrl.vi1), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>IO 2 (V)</td><td>{ _.round((ctrl.vi2), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>IO 3 (V)</td><td>{ _.round((ctrl.vi3), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>IO 4 (V)</td><td>{ _.round((ctrl.vi4), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>Ignition (V)</td><td>{ _.round((ctrl.vign), 2).toFixed(2) }</td><td></td></tr>

        <tr><td>wd</td><td>{ ctrl.wd }</td><td></td></tr>

        <tr><td>wd_reset</td><td>{ ctrl.wd_reset }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-xs btn-info" onClick={() => switches("wdres")}>Reset</button>
                </div>
            </td>
        </tr>

        <tr>
            <td>wd_timeout</td>
            <td>{ ctrl.wd_timeout }</td>
            <td>
                <div className="input-group">
                    <input type="text" className="form-control input-xs" placeholder="set the watchdog timeout in seconds" value={props.value.wdtoValue} onChange={(event) => input(event, "wdto")}/>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-xs btn-info" onClick={() => send('save', "wdto", props.value.wdtoValue, `Setting watchdog timeout to ${props.value.wdtoValue} mV`)}>Save</button>
                    </span>
                </div>
            </td>
        </tr>

        <tr><td>wd_timer</td><td>{ ctrl.wd_timer }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className={`btn btn-xs btn-info ${(ctrl.wd === 640) ? "active" : ""}`} onClick={() => switches("wd", 1)}>On</button>
                    <button type="button" className={`btn btn-xs btn-info ${(ctrl.wd === 512) ? "active" : ""}`} onClick={() => switches("wd", 0)}>Off</button>
                </div>
            </td>
        </tr>

      </tbody>
      </table>
    </div>
  )
}
        // <tr><td>blid</td><td>{ ctrl.blid }</td></tr>
        // <tr><td>fwid</td><td>{ ctrl.fwid }</td></tr>
        // <tr><td>hwid</td><td>{ ctrl.hwid }</td></tr>
        // <tr><td>ign</td><td>{ ctrl.ign }</td></tr>
        // <tr><td>ign_vhigh</td><td>{ ctrl.ign_vhigh }</td></tr>
        // <tr><td>ign_vlow</td><td>{ ctrl.ign_vlow }</td></tr>
        // <tr><td>out (V)</td><td>{ _.round((ctrl.out), 2).toFixed(2) }</td></tr>
        // <tr><td>pwroff_hard</td><td>{ ctrl.pwroff_hard }</td></tr>
        // <tr><td>pwroff_hard_to</td><td>{ ctrl.pwroff_hard_to }</td></tr>
        // <tr><td>pwroff_soft</td><td>{ ctrl.pwroff_soft }</td></tr>
        // <tr><td>pwroff_soft_to</td><td>{ ctrl.pwroff_soft_to }</td></tr>
        // <tr><td>pwroff_src</td><td>{ ctrl.pwroff_src }</td></tr>
        // <tr><td>pwroff_src_prev</td><td>{ ctrl.pwroff_src_prev }</td></tr>
        // <tr><td>pwroff_stat</td><td>{ ctrl.pwroff_stat }</td></tr>
        // <tr><td>pwron_src</td><td>{ ctrl.pwron_src }</td></tr>
        // <tr><td>time</td><td>{ ctrl.time }</td></tr>
        // <tr><td>uuid</td><td>{ ctrl.uuid }</td></tr>
        // <tr><td>wd</td><td>{ ctrl.wd }</td>




