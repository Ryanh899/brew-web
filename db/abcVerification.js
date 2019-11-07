const knex = require('./knex/knex')
const __ = require('lodash')
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

// Verification Model
const abcVerify = {
    // Verify
    verify: (obj, req) => {
        knex
            //abc license number is coming from req not from business
            .select('abcVerification.*', 'business.abclicense')
            .from('abcVerification')
            .leftJoin('business', 'abcVerification.File_Number', 'business.abclicense')
            .where({
                File_Number: obj.file_number,
                License_Type: obj.license_type,
                DBA_Name: obj.DBA_Name
            })
            .then((resp) => {
                console.log(resp)
                // Response is an array, if = 0, then business does not exist or has been taken
                if (!resp.length) {
                    return 'Does Not Exist';
                } else if (resp[0].abcVerification.File_Number === resp[0].business.abclicense) {
                    return 'Business Already Registered'
                } else {
                    const business = resp[0].abcVerification

                    // If address 2 is blank, then empty string
                    let addr2 = ''

                    // Otherwise, whatever it is
                    if (business.Prem_Addr_2) {
                        addr2 = business.Prem_Addr_2
                    }

                    geocoder.geocode(`${business.Prem_Addr_1} ${addr2} ${business.Prem_City} ${business.Prem_State} ${business.Prem_Zip}`)
                        .then((georesp) => {
                            return knex('business')
                                .insert({
                                    name: business.DBA_Name,
                                    address1: business.Prem_Addr_1,
                                    address2: addr2,
                                    city: business.Prem_City,
                                    state: business.Prem_State,
                                    zip: business.Prem_Zip,
                                    latitude: georesp.results[0].geometry.location.lat,
                                    longitude: georesp.results[0].geometry.location.lng,
                                    abclicense: business.File_Number,
                                    user_id: req.user.id

                                })
                                .catch(err => console.log(err));
                        })
                }
            })
            .catch(err => console.log(err));
    }
}