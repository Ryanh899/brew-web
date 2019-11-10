import React, { Component } from "react";
import AuthService from './components/AuthService.jsx'; 

// routing
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from './PrivateRoute'; 

// styling
import "./App.css";

// components
import Main from "./components/Main/Main.jsx";
import Splash from './components/Splash/Splash.jsx'; 
import Dashboard from './components/BusinessPortal/Dashboard/Dashboard'; 
import NotFound from './components/NotFound.jsx'; 

// launch main web component
class App extends Component {
  constructor (props) {
    super(props)
    this.Auth = new AuthService('http://localhost:3000/');
    this.state = {
      user: null, 
      isAuthenticated: false, 
    };
  }

  

  componentDidUpdate(snapshot) {
    console.log(this.Auth.loggedIn())
    if (this.Auth.loggedIn() !== this.state.isAuthenticated ){
      this.setState({
        user: '', 
        isAuthenticated: false
      })
    }
  }

  getUser = (user) => {
    console.log(user)
    if (user) {
      this.setState({
        user: user, 
        isAuthenticated: true
      })
    } else {
      console.log('no user')
    }
  }; 

   routing = (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Main {...props}  getUser={this.getUser} />} />
          <Route exact path="/splash/:user" render={(props) => <Main {...props}  getUser={this.getUser} />} />
          <Route exact path="/dashboard" render={(props) => <Dashboard {...props} user={this.state.user} />} />
          {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );

  componentDidMount() {
    console.log("app componentDidMount - connect backend");
  }

  render() {
    return this.routing;
  }
}

export default App;
