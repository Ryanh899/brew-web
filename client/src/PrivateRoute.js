import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log({ component: Component, ...rest })
    return (
        <Route {...rest} render={(props) => (
        props.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />  
        )} /> 
    )
}
  


export default PrivateRoute; 
