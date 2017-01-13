const Gps = (props) => {
  const gps   = props.data.gps
  const gpgga = gps.gpgga ? gps.gpgga : {} 
  const gprmc = gps.gprmc ? gps.gprmc : {}

  return (
    <div>
     <h3><span className="label label-success">GPS</span></h3>
      <table className="table table-striped table-condensed">
      <tbody>
        <tr><td>Time (s)</td><td>{ _.ceil(gpgga.time) }</td></tr>
        <tr><td>Latitude (°)</td><td>{ gpgga.latitude }</td></tr>
        <tr><td>Longitude (°)</td><td>{ gpgga.longitude }</td></tr>
      </tbody>
      </table>            
    </div>
  )
}

/*
    <div>
     <h3><span className="label label-success">GPS</span></h3>
      <table className="table table-striped table-condensed">
      <thead>
        <tr><th></th><th>GPGGA</th><th>GPRMC</th></tr>
      </thead>
      <tbody>
        <tr><td>Time</td><td>{ gpgga.time }</td><td>{ gprmc.time }</td></tr>
        <tr><td>Latitude</td><td>{ gpgga.latitude }°</td><td>{ gprmc.latitude }°</td></tr>
        <tr><td>Longitude</td><td>{ gpgga.longitude }°</td><td>{ gprmc.longitude }°</td></tr>
      </tbody>
      </table>            
    </div>
*/
