import React, { Component } from 'react';

// material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button'

// components
import BusinessSignIn from './WebSignIn/BusinessSignIn.jsx';
import MobileApp from './MobileApp/MobileApp.jsx';
import AddBusiness from '../BusinessPortal/AddBusiness/AddBusinessPage/AddBusiness.jsx';
import Footer from '../Footer/Footer.js';

// style
import logo from '../../images/brew.png';
import './Splash.css'
import { Animated } from 'react-animated-css';

// routing 
import {
    BrowserRouter as Router,
    withRouter,
} from "react-router-dom";

// styling; export to css
const styles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    btnSpacing: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        backgroundColor: '#edece4',
    }
});

// render sign in page
class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            claimBusiness: false
        };
    };
    // sets claimbusiness to true triggering addBusiness form to open 
    claimBusinessClick = () => {
        this.setState({
            claimBusiness: true
        });
    };

    // sets claimbusiness to true triggering addBusiness form to close 
    closeForm = () => {
        this.setState({
            claimBusiness: false
        });
    };


    render(props) {
        const { classes } = this.props;
        let showForm = this.state.claimBusiness

        return (
            <Router>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid className={classes.content} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                        {/* heading */}
                            <Animated
                                animationIn="slideInDown"
                            >
                                <img src={logo} className="logo" />
                            </Animated>

                            <Animated
                                animationIn="fadeInDown"
                                animationInDelay={500}
                            >
                                <Typography component="h1" variant="h5">
                                    Business Portal
                            </Typography>
                                <hr className="divider" />
                            </Animated>
                            {/* if authenticated and not a business user render button to render claim business form */}
                            {this.props.authenticated === true && this.props.user.user_type === 'user' ? (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.btnSpacing}
                                    onClick={() => {this.claimBusinessClick()}}
                                >
                                    Claim Your Business
                                </Button>
                            ) : (
                                //  else render business sign in component 
                                <Animated
                                animationIn="flash"
                                animationInDelay={2000}
                                >
                                    <BusinessSignIn
                                        user={this.props.user}
                                        authenticated={this.props.authenticated}
                                        dashboardClick={this.props.goToDashboard}
                                    />
                                </Animated>
                            )}
                            {this.props.authenticated ? (
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                className={classes.btnSpacing}
                                onClick={() => {this.props.logOut()}}
                            >
                                Logout
                            </Button> 
                            ) : (
                                <div></div>
                            )}
                            {/* if claimBusiness in state is true render the form if not render nothing */}
                            {showForm ? <AddBusiness user={this.props.user} closeForm={this.closeForm} /> : <div></div>}

                            <Animated
                                animationIn="fadeIn"
                                animationInDelay={5000}
                            >
                                <MobileApp />
                            </Animated>

                            <Box mt={3}>
                                <Animated
                                    animationIn="fadeInDown"
                                    animationInDelay={1000}
                                >
                                    <Footer />
                                </Animated>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Router>
        );
    };
};

export default withRouter(withStyles(styles)(Splash)); 