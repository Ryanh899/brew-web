const yelp = require('yelp-fusion');
const dotenv = require('dotenv');
dotenv.config();

const keys = require('../config/env_config');

// const client = yelp.client(keys.YELP_ENV);
const client = yelp.client(keys.YELP_CLIENT);

const yelpSearch = {
    getBusinessInfo: (cb, term, location) => {
        client.search({
            term: term,
            location: location,
        }).then(response => {
            cb.json(response.jsonBody)
        }).catch(e => {
            console.log(e);
        })
    },
    otherInfo: (cb, term, location) => {
        let splitTerm = term.split('+').join('-');
        let splitLocation = location.split('+').join('-');
        let search = `${splitTerm}-${splitLocation}`;
        console.log(search)
        client.business(search).then(response => {
            console.log(response)
            cb.json(response.jsonBody);
        }).catch(e => {
            console.log(e);
        });
    },
}
module.exports = yelpSearch; 