// const socket = window.io.connect('http://localhost:3000')
const socket = io.connect('http://192.168.1.25:3000')

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
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
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
    temperature: {} 
  }

  componentDidMount = () => {
    socket.on('state', (data) => {
      this.setState(data)
    })  

  }

  render = () => {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <OsInfo data={this.state.os} />
              <Sensors data={this.state} />
            </div>
            <div className="col-md-6">
              <Ctrl data={this.state} />
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