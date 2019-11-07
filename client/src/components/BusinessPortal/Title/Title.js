import React from 'react';

// material-ui
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

// render title
export default function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

// REFACTOR ???
Title.propTypes = {
    children: PropTypes.node,
};