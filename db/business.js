const knex = require('./knex/knex'); 
const __ = require('lodash'); 
const dotenv = require('dotenv');
dotenv.config();

//node geocoder package to convert address to lat/long
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(options);

// Business Model
const Business = {
    // Gets all Businesses
    getAllBusiness: (cb) => {
        knex('business')
            .select('*')
            .then(response => {
                cb.json(response)
            })
            .catch(err => console.log(err)); 
    }, 
    // Adds a Business
    addBusiness: (obj, req, cb) => {
        knex('Business')
            .insert({
                user_id: obj.user_id, 
                owner_name: obj.ownerName, 
                business_name: obj.businessName, 
                address1: obj.businessAddr1, 
                city: obj.businessCity, 
                state: obj.businessState, 
                zip: obj.businessZip, 
                // latitude: obj.latitude, 
                // longitude: obj.longitude,
                abclicense: obj.abcNumber, 
                email: obj.businessEmail,
                phone: obj.businessPhone,
                sellerspermit: obj.sellersPermit
            })
            .then((result) => {
                cb.json(result); 
            })
            .catch(err => console.log(err)); 
    },

    // Get List of All Cities
    getDistinctCities: () => {
        return knex('business').distinct('city')
    }, 
    businessByUser: (id, cb) => {
        knex('business')
            .select('*')
            .where('user_id', id)
            .then(response => {
                cb.json(response);
            })
            .catch(err => console.log(err)); 
    },
    getAllCities: (cb) => {
        knex('cities')
        .select('*')
        .then(response => {
            cb.json(response)
        })
        .catch(err => console.log(err)); 
    }
}; 


module.exports = Business; 