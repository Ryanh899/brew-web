import React, { useEffect } from "react";
import axios from "axios";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Container from "@material-ui/core/Container";

// components
import Footer from "../../Footer/Footer.js";
import PersistentDrawer from "../PersistentDrawer/PersistentDrawer.js";
import BusinessTable from "../BusinessTable/BusinessTable.js";

// auth 
import AuthService from '../../AuthService.jsx'; 

// set styling
const useStyles = makeStyles(theme => ({}));

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
    console.log(props.user)
  if (process.env.NODE_ENV === 'production') {
    url = 'http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/api/businessuser/'
  } else {
    url = 'http://localhost:3000/api/businessuser/'
  }
    if (props.user) {
      axios
        .get(url + props.user.id)
        .then(function (res) {
          setBusinessInformation(res);
          setCurrentBusiness(res.data[0].id);
          setHasBusiness(true);
          setUser(props.user[0]); 
        }).catch(err => err); 
    } else if (props.location.user) {
      axios
        .get(url + props.location.user.id)
        .then(function (res) {
          setBusinessInformation(res);
          setCurrentBusiness(res.data[0].id);
          setHasBusiness(true);
          setUser(props.location.user[0]); 
        }).catch(err => err); 
    } else if (user.length === 0) {
        let profile = Auth.getProfile(); 
        axios
        .get(url + profile.id)
        .then(function (res) {
          setBusinessInformation(res);
          setCurrentBusiness(res.data[0].id);
          setHasBusiness(true);
          setUser(profile); 
        }).catch(err => err); 
    }
  }, [props.user]);

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
          // userName={user.name}
        />
      ) : (
          console.log("Drawer not mounted")
        )}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <Container maxWidth="lg">
          <div>
            {hasBusiness ? (
              <BusinessTable businessId={currentBusiness} />
            ) : (
                console.log("not mounted")
              )}
          </div>
        </Container>
        <Footer />
      </main>
    </div>
  );
};
