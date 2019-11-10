const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const jwt = require('express-jwt'); 
const querystring = require('querystring');
const keys = require('../config/env_config'); 
const User = require('../db/user'); 

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000'

// when login is successful, retrieve user info
router.get("/login/success/:id", async (req, res) => {
  console.log(req.params)
  if (req.params.id !== undefined) {
    let userInfo = await User.getUserById(req.params.id)
    let token = jwt.sign(userInfo[0], Buffer.from(keys.privateKey, 'base64'), {expiresIn: "6h"})
    res.json({
      success: true,
      status: 200, 
      message: "user has successfully authenticated",
      user: userInfo[0], 
      token: token
    })
  } else {
    res.json({
      success: false, 
      message: 'no user id received', 
    })
  }
});

//auth log out 
router.get('/logout', (req, res) => {
    //handle with passport 
    req.logout(); 
    res.redirect(CLIENT_HOME_PAGE_URL); 
}); 

//google auth 
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'openid', 'email'],
    failureRedirect: CLIENT_HOME_PAGE_URL
  })
);

// //google auth redirect 
router.get('/google/redirect', passport.authenticate('google', { session: false }), async (req, res) => {
  console.log(req.user)  
  let token = '';
  let user = {
    id: req.user.id
  }
  if (req.user) {
    token = jwt.sign(user, Buffer.from(keys.privateKey, 'base64'), {expiresIn: "6h"})
  } 
  if (process.env.NODE_ENV === 'production') {
    // final aws url 
    res.redirect('/splash/' + token)
  } else {
    res.redirect('http://localhost:3000/splash/' + token )
  }
}); 


module.exports = router;