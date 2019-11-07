import React from 'react';


// material-ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// components
import Dashboard from '../../BusinessPortal/Dashboard/Dashboard.js';

// styling
const useStyles = makeStyles(theme => ({
    btnSpacing: {
        margin: theme.spacing(3, 0, 2),
    },
    color: {
        color: 'gold',
    },
}));

// events
const handleLogInClicks = () => {
    // route to auth
    let url = '';
    if (process.env.NODE_ENV === 'production') {
        url = "http://ec2-3-14-27-130.us-east-2.compute.amazonaws.com/auth/google/"
    } else {
        url = "http://localhost:5000/auth/google/"
    }
    window.open(url, "_self"); // REFACTOR FROM 3000 to 5000
};

// render components
export default function BusinessSignIn(props) {
    const classes = useStyles();
    if (props.authenticated && props.user.user_type === 'businessuser') {
        return (
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.btnSpacing}
                onClick={props.ButtonClick}
            >
                Business Dashboard
                    </Button>
        );
    } else if (props.authenticated === false) {
        return (
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.btnSpacing}
                onClick={handleLogInClicks}
            >
                Login in with Google
            </Button>
        );
    } else if (props.authenticated) {
        return (
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.btnSpacing}
                onClick={() => props.handleClaimClick()} // REFACTOR method not handled properly
            >
                Claim a business
            </Button>
        );
    } else {
        return (
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.btnSpacing}
                onClick={handleLogInClicks}
            >
                Login in with Google
            </Button>
        );
    }
};
