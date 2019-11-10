import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import AuthService from '../AuthService.jsx'; 
import decode from 'jwt-decode';
// components
import Splash from '../Splash/Splash.jsx';
// setting theme
const theme = createMuiTheme({
  palette: {
    type: 'light', // 'light', 'dark', manualColor
  },
});

// render web application
class Main extends Component {
  constructor (props) {
    super(props) 
    // going to need to switch to aws url
    this.Auth = new AuthService('http://localhost:3000/');
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
    // static props for routing purposes
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

  // on mount check for authentication 
  async componentDidMount() {
    // if in production use aws route else use local host
    let url = ''; 
    if (process.env.NODE_ENV === 'production') {
      url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/auth/login/success/'; 
    } else {
      url = 'http://localhost:5000/auth/login/success/'; 
    }
    // id to use for fetch
    let userId = ''; 
    // if their is a jwt token present get the user info with that and log them in
    if (this.Auth.loggedIn()) {
      let user = this.Auth.getProfile();  
      //set authenticated to true and make the user obejct = the authenticated in user in app component
      this.props.getUser(user)
      // sets user and authenticated state for this component 
      this.setState({
        authenticated: true,
        user: user
      });
      return 
    } 
    // if there is a user in the url and they are logged in, might never happen
    else if (this.props.match.params.user && this.Auth.loggedIn()) {
        let thisUser = ''; 
        thisUser = await this.Auth.getProfile(); 
        console.log(thisUser)
        if (this.props.match.params.user === thisUser.id) {
          userId = this.props.match.params.user; 
        } 
    }
    // if there is an id token in url
     else if (this.props.match.params.user) {
      //  decode token, get id, send to fetch request
      let userToken = decode(this.props.match.params.user)
      userId = userToken.id
    }



    // if no jwt token but there is a user id hit auth/login/success on node server passing a user id 
    fetch(url + userId, {
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
        //if successful return the response json formatted || user info 
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(async responseJson => {
        console.log(responseJson)
          // sets jwt token in local storage
          this.Auth.setToken(responseJson.token); 
          //set authenticated to true and make the user obejct = the authenticated in user in app component
         this.props.getUser(responseJson.user)
         // sets user and authenticated state for this component 
          this.setState({
           authenticated: true,
           user: responseJson
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

  // log user out
  logOut = () => {
    this.Auth.logout(); 
    if (!this.Auth.loggedIn()) {
      this.setState({
        authenticated: false, 
        user: null
      })
    }
    this.props.history.push({
      pathname: '/',
    })
  }; 

  // function to route to dashboard passing user info
  goToDashboard = () => {
    if (this.Auth.loggedIn() && this.state.user.user_type === 'businessuser')
    this.props.history.push({
        pathname: '/dashboard',
        user: this.state.user,
        isAuthenticated: true,
        logOut: this.logOut
      })
  }; 

  render() {
    // setting react router data in props object
    const { match, location, history } = this.props;
    return (
      <div className="container">
        <ThemeProvider theme={theme} >
          <Splash user_id={match.params} user={this.state.user} logOut={this.logOut} goToDashboard={this.goToDashboard} authenticated={this.state.authenticated} />
        </ThemeProvider>
      </div>
    );
  };
};  

export default Main;