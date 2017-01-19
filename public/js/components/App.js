// const socket = window.io.connect('http://localhost:3000')
const socket = io.connect('http://192.168.1.22:3000')

const { Component } = React

const Navigation = () => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">IVH2 Stats</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Overview</a></li>
            <li><a href="#configure">Configure</a></li>
            <li><a href="#document">Document</a></li>
            <li className="dropdown">
              <a href="#more" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More<span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#action">Action</a></li>
                <li><a href="#another-action">Another action</a></li>
                <li><a href="#something-else-here">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#separated-link">Separated link</a></li>
                <li><a href="#one-more-separated-link">One more separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
)

class App extends Component {

  state = {
    gps: {},
    os: {},
    acc: {},
    gyro: {},
    ctrl: {},
    pressure: {},
    temperature: {},
    configValue: {
      ao1Value: "",
      ao2Value: "",
      vlowValue: "",
      vhighValue: "",
      wdtoValue: ""
    }
  }

  componentDidMount = () => {
    socket.on('state', (data) => {
      this.setState(data)
    })

  }

  onConfigChange = (value, flag) => {
    if (flag === "ao1") {
      this.setState({configValue: {
          ao1Value: value
        }
      })
    }

    if (flag === "ao2") {
      this.setState({configValue: {
          ao2Value: value
        }
      })
    }

    if (flag === "vlow") {
      this.setState({configValue: {
          vlowValue: value
        }
      })
    }

    if (flag === "vhigh") {
      this.setState({configValue: {
          vhighValue: value
        }
      })
    }

    if (flag == "wdto") {
      this.setState({configValue: {
          wdto: value
        } 
      })
    }

  }

  render = () => {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <SystemInfo data={this.state.os} />
            </div>
            <div className="col-md-6">
              <LSM data={this.state} />
              <LPS data={this.state} />
            </div>
          </div>
          <div className="row">
          	<div className="col-md-6">
	            <PMIC data={this.state} value={this.state.configValue} onChange={this.onConfigChange} />
          	</div>
          	<div className="col-md-6">
          		<Config data={this.state} value={this.state.configValue} onChange={this.onConfigChange} />
          	</div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <LoadAverage data={this.state.os} />
            </div>
            <div className="col-md-6">
              <Network data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Memory data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Disk data={this.state.os} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Gps data={this.state} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}