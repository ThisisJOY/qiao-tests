const Network = (props) => {
  const networkInterfaces = props.data.networkInterfaces ? props.data.networkInterfaces : {}
  return (
    <div>
      <table className="table table-striped table-condensed">
        <thead>
          <h3><span className="label label-success">Network</span></h3>
          <tr><th>Interfaces</th><th>Address</th></tr>
        </thead>
        <tbody>
          { networkInterfaces.eth0
            ? networkInterfaces.eth0.map((eth0, i) => <tr><td>eth0 {i + 1}</td><td>{ eth0.address }</td></tr>)
            :<tr><td>eth0</td><td>No eth0 detected</td></tr>
          }
          { networkInterfaces.lo
            ? networkInterfaces.lo.map((lo, i) => <tr><td>lo {i + 1}</td><td>{ lo.address }</td></tr>)
            :<tr><td>lo</td><td>No lo detected</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}