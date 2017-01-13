const LoadAverage = (props) => {
  const loadAverage = props.data.loadavg ? props.data.loadavg.map((i) => `${_.ceil(i * 100)}`) : [0, 0, 0]

  const firstPer    = loadAverage[0]     ? `c100 p${loadAverage[0]}`        : "c100 p0"
  const sencondPer  = loadAverage[1]     ? `c100 p${loadAverage[1]} green`  : "c100 p0 green"
  const thirdPer    = loadAverage[2]     ? `c100 p${loadAverage[2]} orange` : "c100 p0 orange"

  return (
    <div>
      <h3><span className="label label-success">Load Average</span></h3>
      <h5>1 min / 5 min / 15 min</h5>
        <div className="clearfix">  
              <div className={ firstPer }>
                  <span>{ `${loadAverage[0]}%` }</span>
                  <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                  </div>
              </div>

            <div className={ sencondPer }>
              <span>{ `${loadAverage[1]}%` }</span>
              <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
             </div>
            </div>
            <div className={ thirdPer }>
              <span>{ `${loadAverage[2]}%` }</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
      </div>
    </div>
  )
}
