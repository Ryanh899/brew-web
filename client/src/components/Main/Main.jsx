import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import AuthService from '../AuthService.jsx'; 

// components
import Splash from '../Splash/Splash.jsx';
import Dashboard from '../BusinessPortal/Dashboard/Dashboard.js';

// router 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  withRouter, 
  useParams
} from "react-router-dom";
import PrivateRoute from '../../PrivateRoute'; 

const theme = createMuiTheme({
  palette: {
    type: 'light', // 'light', 'dark', manualColor
  },
});

// render web application
class Main extends Component {
  constructor (props) {
    super(props) 
    this.Auth = new AuthService();
  }
  // static props for user info 
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      google_id: PropTypes.string,
      user_type: PropTypes.string,
      id: PropTypes.number
    }), 
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  // state 
  state = {
    // user info 
    user: {},
    error: null,
    authenticated: false
  };
//   componentWillMount() {
//     if (!this.Auth.loggedIn()) {
//         this.props.history.replace('/login')
//     }
//     else {
//         try {
//             const profile = this.Auth.getProfile()
//             this.setState({
//                 user: profile, 
//                 authenticated: true
//             })
//         }
//         catch(err){
//             this.Auth.logout()
//             this.props.history.replace('/login')
//         }
//     }
// }
  // because we are using cookies on mount it will check for authenticated users 
  componentDidMount() {
    console.log(this.props.match)
    let url = ''; 
    if (process.env.NODE_ENV === 'production') {
      url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/auth/login/success/'; 
    } else {
      url = 'http://localhost:5000/auth/login/success/"'; 
    }
    // hits auth/login/success on node server 
    fetch(url + this.props.match.params.user, {
      method: "GET",
      // credentials: "include",
      // cors headers
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }, 
    })
      .then(response => {
        //if success return the response || user info 
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log(responseJson)
        //set authenticated to true and make the user obejct = the authenticated in user 
        this.props.getUser(responseJson.user)
        this.Auth.setToken(responseJson.token)
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        //if authentication fails 
        console.log(error)
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  };

  goToDashboard = () => {
    this.props.history.push({
        pathname: '/dashboard',
        user: this.state.user,
        isAuthenticated: true
      })
  }


  render() {
    const { match, location, history } = this.props;
    return (
      <div className="container">
        <ThemeProvider theme={theme} >
          <Splash user_id={match.params} user={this.state.user} goToDashboard={this.goToDashboard} authenticated={this.state.authenticated} />
        </ThemeProvider>
      </div>
    );
  };
};  

export default Main;