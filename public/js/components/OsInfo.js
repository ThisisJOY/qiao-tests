const OsInfo = (props) => {

  return (
    <div>
      <table className="table table-striped table-condensed">
        <thead>
          <h3><span className="label label-success">System</span></h3>
        </thead>
        <tbody>
          <tr><td>Hostname</td><td>{ props.data.hostname }</td></tr>
          <tr><td>Arch</td><td>{ props.data.arch }</td></tr>
          <tr><td>Platform</td><td>{ props.data.type }</td></tr>
          <tr><td>Release</td><td>{ props.data.release }</td></tr>
          <tr><td>Uptime (s)</td><td>{ props.data.uptime }</td></tr>

          {
            props.data.cpus
              ? props.data.cpus.map((cpu, i) => <tr><td>Cpu {i + 1}</td><td>{ cpu.model }</td></tr>)
              : <tr><td>Cpu</td><td>No CPUs detected</td></tr>
          }

        </tbody>
      </table>
    </div>
  )
}
