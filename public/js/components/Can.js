const Can = (props) => {
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
      <h3><span className="label label-success">Can</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr>
            <td>Can 0</td>
            <td>
              <div className="btn-group" role="group">
                  <button type="button" className="btn btn-xs btn-info" onClick={() => switches("can", "up")}>Up</button>
                  <button type="button" className="btn btn-xs btn-info" onClick={() => switches("can", "down")}>Down</button>
              </div>
            </td>

            <td>
              <div className="dropdown">
                <button className="btn btn-xs btn-info dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Baudrate
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu list-group">
                  <li><button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "125kbps")}>125 kbit/s</button></li>
                  <li><button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "250kbps")}>250 kbit/s</button></li>
                  <li><button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "500kbps")}>500 kbit/s</button></li>
                  <li><button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "1000kbps")}>1000 kbit/s</button></li>
                </ul>
              </div>
            </td>
        </tr>

        <tr>
            <td>Can 1</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-xs btn-info" onClick={() => switches("can", "up")}>Up</button>
                    <button type="button" className="btn btn-xs btn-info" onClick={() => switches("can", "down")}>Down</button>
                </div>
            </td>
            <td>
              <div className="dropdown">
                <button className="btn btn-xs btn-info dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Baudrate
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "125kbps")}>125 kbit/s</button>
                  <button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "250kbps")}>250 kbit/s</button>
                  <button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "500kbps")}>500 kbit/s</button>
                  <button type="button" className="list-group-item btn-xs" onClick={() => switches("can", "1000kbps")}>1000 kbit/s</button>
                </ul>
              </div>
            </td>
        </tr>

      </tbody>
      </table>
    </div>
  )
}