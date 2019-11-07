import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

// component
import AddBusinessForm from "../AddBusinessForm/AddBusinessForm.jsx";

//styling 
const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
            .spacing.unit * 5}px`
    },
    container: {
        maxWidth: "200px"
    }
});

//uses Yup to validate submission object 
const validationSchema = Yup.object({
    businessName: Yup.string("Enter a name")
        .required("Name is required"),
    ownerName: Yup.string("Enter your name")
        .required('Name is required'),
    sellersPermit: Yup.string("Enter your Sellers Permit Number")
        .required("Sellers permit number is required"),
    abcNumber: Yup.string("Enter your ABC number")
        .required("ABC Number is required"),
    businessEmail: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    businessPhone: Yup.string("Phone Number")
        .required("Phone number is required")
        .min(9, "Phone number must be at least 9 digits"),
    businessAddr1: Yup.string("Address")
        .required("Address is required"),
    businessCity: Yup.string("City")
        .required("City is required"),
    businessState: Yup.string("State")
        .required("State is required"),
    businessZip: Yup.string('Zip Code')
        .required('Zip is required')
        .min(5, "Must be at least 5 digits")
});

//entire form component 
class AddBusinessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    submitValues = ({ businessName, ownerName, sellersPermit, abcNumber, businessEmail, businessPhone, businessAddr1, businessCity, businessState, businessZip }) => {
        console.log({ businessName, ownerName, sellersPermit, abcNumber, businessEmail, businessPhone, businessAddr1, businessCity, businessState, businessZip });
        let pendingBusiness = { businessName, ownerName, sellersPermit, abcNumber, businessEmail, businessPhone, businessAddr1, businessCity, businessState, businessZip };
        let user = this.props.user
        pendingBusiness.user_id = user[0].id
        axios
            .post('http://localhost:3000/api/addBusiness', pendingBusiness)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
    };

    render() {
        const classes = this.props;
        const values = { businessName: "", ownerName: "", sellersPermit: "", abcNumber: "", businessEmail: "", businessPhone: "", businessAddr1: "", businessCity: "", businessState: "", businessZip: "" };
        return (
            <React.Fragment>
                <div className={classes.container}>
                    <Paper elevation={1} className={classes.paper}>
                        <Icon onClick={this.props.closeForm} ><CloseIcon /></Icon>
                        <Formik
                            render={props => <AddBusinessForm {...props} />}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={this.submitValues}
                        />
                    </Paper>
                </div>
            </React.Fragment>
        );
    };
};

export default withStyles(styles)(AddBusinessPage);