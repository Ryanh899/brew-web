//requiring dependencies 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const knex = require('../db/knex/knex');
const __ = require('lodash'); 
require('dotenv').config();
const keys = require('./env_config'); 

passport.use(
    new GoogleStrategy({
        //Google strategy options 
        callbackURL: '/auth/google/redirect',
        //google client id and secret from dotenv 
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //strategy callback 
        // console.log(profile)
        //lodash to pick data we need from profile object 
        let data = __.pick(profile, 'displayName', 'id', 'name', 'photos'); 
        //returning a promise 
        return new Promise((resolve, reject) => {
            //select where id = id to verify this is a new user before creating a new user in the db
                knex('users').select()
                    .where('google_id', data.id)
                    .then((rows) => {
                        if (rows.length === 0) {
                            //if user doesn't exist make new user
                            knex('users').insert({
                                    name: data.displayName,
                                    google_id: data.id,
                                    image: data.photos[0].value
                                }) 
                                .then((resp) => {
                                    //then resolve promise 
                                    resolve(resp); 
                                })
                        } else {
                            //if it does exist send to be serialized \
                            done(null, rows[0]); 
                        }
                    })
            }).then(() => {
                //return the user signing in and send it to the serialize function to make them a cookie and show that they are signed in 
                return knex('users').where('google_id', data.id).select(); 
            }).then((user_id) => {
                done(null, user_id[0]); 
            })
            .catch(err => {
                throw err; 
            }); 
    })
); 