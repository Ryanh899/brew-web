// Variables
const knex = require("./knex/knex");
const __ = require("lodash");

// Promotions Model
const User = {
 getUserById: (id) => {
    let promise = new Promise((resolve, reject) => {
        knex('users')
        .select('*')
        .where('id', id)
        .then(response => {
            console.log('User Model: ' + JSON.stringify(response) )
            resolve(response)
        })
        .catch(err => {
            return err
        })
    }).catch(err => console.log(err))
    return promise   
 }
};

module.exports = User;
