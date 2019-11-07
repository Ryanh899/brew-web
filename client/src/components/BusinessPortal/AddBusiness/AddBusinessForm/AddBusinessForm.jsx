import React from 'react';

//page style imports 
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//making styles import 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    activeButton: {
        backgroundColor: '#aeb8b1',
        outlined: {
            backgroundColor: 'red'
        }
    },
    disabledButton: {
        backgroundColor: "#c4ccc6"
    }
}));

//form component 
const AddBusinessForm = props => {
    const classes = useStyles();
    //deconstructing props to use in form 
    const {
        values: { businessName, ownerName, sellersPermit, abcNumber, businessEmail, businessPhone, businessAddr1, businessCity, businessState, businessZip },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleSubmit
    } = props;

    //handles input change to set values to match input 
    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };


    return (

        <Container >
            <form
                onSubmit={handleSubmit}
            >
                <CssBaseline />
                <Grid container spacing={2} >

                    {/* Business name */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-Name"
                            name="businessName"
                            required={true}
                            error={touched.businessName && Boolean(errors.businessName)}
                            label="Business Name"
                            value={businessName}
                            onChange={change.bind(null, "businessName")}
                            fullWidth
                        />
                    </Grid>

                    {/* Owner Name  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="owner-Name"
                            name="ownerName"
                            label="Owner"
                            required={true}
                            helperText={touched.ownerName ? errors.ownerName : ""}
                            error={touched.ownerName && Boolean(errors.ownerName)}
                            value={ownerName}
                            onChange={change.bind(null, "ownerName")}
                            fullWidth
                        />
                    </Grid>

                    {/* Sellers permit  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="sellers-permit"
                            name="sellersPermit"
                            label="Sellers Permit"
                            required={true}
                            helperText={touched.sellersPermit ? errors.sellersPermit : ""}
                            error={touched.sellersPermit && Boolean(errors.sellersPermit)}
                            value={sellersPermit}
                            onChange={change.bind(null, "sellersPermit")}
                            fullWidth
                        />
                    </Grid>

                    {/* ABC Number  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="abc-number"
                            name="abcNumber"
                            label="ABC Number"
                            required={true}
                            helperText={touched.abcNumber ? errors.abcNumber : ""}
                            error={touched.abcNumber && Boolean(errors.abcNumber)}
                            value={abcNumber}
                            onChange={change.bind(null, "abcNumber")}
                            fullWidth
                        />
                    </Grid>

                    {/* Email  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-email"
                            name="businessEmail"
                            label="Email"
                            required={true}
                            helperText={touched.businessEmail ? errors.businessEmail : ""}
                            error={touched.businessEmail && Boolean(errors.businessEmail)}
                            value={businessEmail}
                            onChange={change.bind(null, "businessEmail")}
                            fullWidth
                        />
                    </Grid>

                    {/* Phone Number  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-phone"
                            name="businessPhone"
                            type='number'
                            label="Phone"
                            required={true}
                            helperText={touched.businessPhone ? errors.businessPhone : ""}
                            error={touched.businessPhone && Boolean(errors.businessPhone)}
                            value={businessPhone}
                            onChange={change.bind(null, "businessPhone")}
                            fullWidth
                        />
                    </Grid>

                    {/* Address  */}
                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-addr1"
                            name="businessAddr1"
                            label="Address"
                            required={true}
                            helperText={touched.businessAddr1 ? errors.businessAddr1 : ""}
                            error={touched.businessAddr1 && Boolean(errors.businessAddr1)}
                            value={businessAddr1}
                            onChange={change.bind(null, "businessAddr1")}
                            fullWidth
                        />
                    </Grid>

                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-city"
                            name="businessCity"
                            label="City"
                            required={true}
                            helperText={touched.businessCity ? errors.businessCity : ""}
                            error={touched.businessCity && Boolean(errors.businessCity)}
                            value={businessCity}
                            onChange={change.bind(null, "businessCity")}
                            fullWidth
                        />
                    </Grid>

                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-state"
                            name="businessState"
                            label="State"
                            required={true}
                            helperText={touched.businessState ? errors.businessState : ""}
                            error={touched.businessState && Boolean(errors.businessState)}
                            value={businessState}
                            onChange={change.bind(null, "businessState")}
                            fullWidth
                        />
                    </Grid>

                    <Grid item md={6} xs={12} >
                        <TextField
                            id="business-zip"
                            name="businessZip"
                            label="Zip Code"
                            type='number'
                            required={true}
                            helperText={touched.businessZip ? errors.businessZip : ""}
                            error={touched.businessZip && Boolean(errors.businessZip)}
                            value={businessZip}
                            onChange={change.bind(null, "businessZip")}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} alignItems='center' justify="center" direction="row" container>
                        <Button
                            fullWidth={true}
                            disabled={!isValid}
                            id="submit-button"
                            type="submit"
                            display='flex'
                            className={!isValid ? classes.disabledButton : classes.activeButton} >
                            Submit
                </Button>
                    </Grid>
                    {/* end form and address  */}
                </Grid>
            </form>
        </Container>
    );
};

export default AddBusinessForm;