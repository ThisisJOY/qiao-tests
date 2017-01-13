const Disk = (props) => {
  const totalDisk          = _.ceil(props.data.totaldisk / ( 1024 * 1024 ))
  const freeDisk           = _.ceil(props.data.freedisk / ( 1024 * 1024 ))
  const freeDiskPercentage = _.ceil(100 * freeDisk / totalDisk)
  const usedDiskPercentage = _.ceil(100 * (totalDisk - freeDisk) / totalDisk)

  return (
    <div>
      <h3><span className="label label-success">Disk</span></h3>
      <table className="table table-striped table-condensed">
      <thead><th>Use %</th><th></th><th>Used</th><th>Free</th><th>Total</th></thead>
      <tbody>
        <tr>
        <td>
          <div className="progress">
            <div className="progress-bar progress-bar-warning" style={{width: `${usedDiskPercentage}%`}}>{usedDiskPercentage}%</div>
          </div>
        </td>
        <td></td>
        <td>{ totalDisk - freeDisk } MB</td>
        <td>{ freeDisk } MB</td>
        <td>{ totalDisk } MB</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}