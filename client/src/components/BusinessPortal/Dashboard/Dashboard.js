import React, { useEffect } from "react";
import axios from "axios";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress'; 
import Grid from '@material-ui/core/Grid'; 

// components
import Footer from "../../Footer/Footer.js";
import PersistentDrawer from "../PersistentDrawer/PersistentDrawer.js";
import BusinessTable from "../BusinessTable/BusinessTable.js";

// auth 
import AuthService from '../../AuthService.jsx'; 

// set styling
const useStyles = makeStyles(theme => ({
  loading: {
    justifyContent:'center'
  }
}));

// render dashboard
export default function Dashboard(props) {
  let Auth = ''; 
  if (process.env.NODE_ENV === 'production') {
    Auth = new AuthService('http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/');
  } else {
    Auth = new AuthService('http://localhost:3000/');
  }
  const classes = useStyles();
  const [open] = React.useState(true);
  const [businessInformation, setBusinessInformation] = React.useState(false);
  const [currentBusiness, setCurrentBusiness] = React.useState(0);
  const [hasBusiness, setHasBusiness] = React.useState(false);
  const [user, setUser] = React.useState([]); 

  //on mount, we get business User using an ID and update the state
  useEffect(() => {
    let url = ''
  if (process.env.NODE_ENV === 'production') {
    url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/businessuser/'
  } else {
    url = 'http://localhost:3000/api/businessuser/'
  }
  
    if (Auth.loggedIn()) {
      let user = Auth.getProfile(); 
      if (user.user_type === 'businessuser') {
        axios
          .get(url + user.id)
          .then(function (res) {
            setBusinessInformation(res);
            setCurrentBusiness(res.data[0].id);
            setHasBusiness(true);
            setUser(user); 
          }).catch(err => err); 
      } else {
        props.history.push({
          pathname: '/',
        })
        return 
      }
    } else {
      props.history.push({
        pathname: '/',
      })
    }; 
  }, [props.user]);

  const logOutRedirect = () => {
    props.history.push({
        pathname: '/',
      })
  }; 

  const logOut = () => {
    Auth.logout(); 
    logOutRedirect(); 
  }

  const currentBusinessChange = id => {
    console.log("setting");
    setCurrentBusiness(id);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {businessInformation ? (
        <PersistentDrawer
          business={businessInformation}
          currentBusinessChange={currentBusinessChange}
          user={user}
          logOut={logOut}
        />
      ) : (
        <Grid
        container
        className={classes.loading}
        >
          <Grid
          item 
          >
            <CircularProgress />
          </Grid>
        </Grid>
        )}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Container maxWidth="lg">
          <div>
            {hasBusiness ? (
              <BusinessTable user={user} businessId={currentBusiness} />
            ) : (
                console.log("not mounted")
              )}
          </div>
        </Container>
        {businessInformation ? (
        <Footer />
      ) : (
        console.log('no user')
        )}
        
      </main>
    </div>
  );
};
