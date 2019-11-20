//requires dotenv file 
const dotenv = require('dotenv');
dotenv.config();

//exports passwords aliased in camel case
module.exports = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER, 
  db: process.env.DB,

  privateKey: process.env.PRIVATE_KEY,
  YELP_CLIENT: process.env.YELP_CLIENT,

};