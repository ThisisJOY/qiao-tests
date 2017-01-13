const Memory = (props) => {
  const totalMem          = _.ceil(props.data.totalmem / ( 1024 * 1024 ))
  const freeMem           = _.ceil(props.data.freemem / ( 1024 * 1024 ))
  const freeMemPercentage = _.ceil(100 * freeMem / totalMem)
  const usedMemPercentage = _.ceil(100 * (totalMem - freeMem) / totalMem)

  return (
    <div>
      <h3><span className="label label-success">Memory</span></h3>
      <table className="table table-striped table-condensed">
      <thead><th>Use %</th><th></th><th>Used</th><th>Free</th><th>Total</th></thead>
      <tbody>
        <tr>
        <td>
          <div className="progress">
            <div className="progress-bar progress-bar-warning" style={{width: `${usedMemPercentage}%`}}>{usedMemPercentage}%</div>
          </div>
        </td>
        <td></td>
        <td>{ totalMem - freeMem } MB</td>
        <td>{ freeMem } MB</td>
        <td>{ totalMem } MB</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}