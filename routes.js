// routes.js
// import React, { Component } from 'react'
// import { Route, IndexRoute, Link } from 'react-router'
// import Home from './pages/home.js'
// import About from './pages/about.js'
// import Explore from './pages/explore.js'
// import Contact from './pages/contact.js'
// import NoMatch from './pages/noMatch.js'
// import Network from './pages/network.js'
// import LANInterface from './pages/LANInterface.js'
// import WLANInterface from './pages/WLANInterface.js'

// Main component
class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
       //<div>
         //<h1>Welcome to In Vehicle Hub 2</h1>
            // <nav>
               // <ul>
                  // <li><Link to="/">Home</Link></li>
                  // <li><Link to="/about">About</Link></li>
                  // <li><Link to="/explore">Explore IVH2</Link></li>
                  // <li><Link to="/contact">Contact</Link></li>
               // </ul>
            // </nav>
         // { this.props.children }
       // </div>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
          <a class="navbar-brand" href="/">
            <img class="pull-left mr-15 relative logo__graphic" src="/images/logo.jpg" width="346" height="98"></img>
            <span class="pull-left gotham-rounded logo__text"></span>
          </a>
      </div>
    </div>
    { this.props.children }
    </nav>
    )
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="network" component={Network}/>
    <Route path="LANInterface" component={LANInterface}/>
    <Route path="WLANInterface" component={WLANInterface}/>
    <Route path="explore" component={Explore}/>
    <Route path="contact" component={Contact}/>
    <Route path="*" component={NoMatch}/>
  </Route>
)