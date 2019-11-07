import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// styling
const useStyles = makeStyles(theme => ({
  // promo bottom
  labelPadding: {
    paddingTop: '20px'
  },
  buttonMargin: {
    marginTop: '20px'
  }
}));

function PromotionForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    Description: "",
    quantity: '',
    nameError: false,
    DescriptionError: false,
    quantityError: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //checks to make sure inputs are okay
  const validateInputs = () => {
    const name = values.name;
    const description = values.Description;
    const quantity = values.quantity;
    let nameError = false;
    let descriptionError = false;
    let quantityError = false;

    if (name === "") {
      nameError = true;
    }

    if (description === "") {
      descriptionError = true;
    }

    if (isNaN(quantity) || quantity < 1) {
      quantityError = true;
    }

    //sets the stae values to render error
    setValues({ ...values, 'nameError': nameError, 'quantityError': quantityError, 'DescriptionError': descriptionError });

    //returns based on the errors present
    if (!nameError && !descriptionError && !quantityError) {
      return true;
    } else {
      return false;
    }
  };

  const buttonClick = () => {
    if (validateInputs()) {
      props.formContents(values);
    } else {
      // REFACTOR empty else
    }
  };

  return (
    <form noValidate autoComplete="off">
      <InputLabel htmlFor="formName" className={classes.labelPadding}>Name</InputLabel>
      <TextField
        error={values.nameError}
        id="formName"
        label="Name"
        value={values.name}
        margin="normal"
        variant="outlined"
        fullWidth={true}
        onChange={handleChange("name")}
        required={true}
        type={"string"}
      />

      <InputLabel htmlFor="formName">Description</InputLabel>

      <TextField
        error={values.DescriptionError}
        id="formDescription"
        label="Description"
        value={values.Description}
        margin="normal"
        variant="outlined"
        fullWidth={true}
        onChange={handleChange("Description")}
        required={true}
        type={"string"}
      />

      <InputLabel htmlFor="formName">Quantity</InputLabel>

      <TextField
        error={values.quantityError}
        id="formQuantity"
        label="Quantity"
        value={values.quantity}
        margin="normal"
        variant="outlined"
        fullWidth={true}
        onChange={handleChange("quantity")}
        required={true}
        type={"number"}
      />
      <Button variant="outlined" color="primary" onClick={buttonClick} className={classes.buttonMargin}>
        Submit
      </Button>
    </form>
  );
};

export default PromotionForm;
