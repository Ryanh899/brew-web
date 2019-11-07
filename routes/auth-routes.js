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
  let userInfo = await User.getUserById(req.params.id)
  let token =  jwt.sign(userInfo[0], keys.privateKey, {expiresIn: "12h"})
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: userInfo[0], 
      token: token
    })
});

// router.get('/login', function(req, res, next) {
//   passport.authenticate('google', function(err, user, info) {
//     if (err) return err; 
//     if (user) {
//       jwtConverter.sign(user, keys.JWTSECRET,  function(err, token) {
//         // console.log('hit: ' + JSON.parse(token))
//         res.json({
//           success: true,
//           message: "user has successfully authenticated",
//           user: user, 
//           token: token
//         });
//       });
//     }
//   })(req, res, next);
// });

//auth log out 
router.get('/logout', (req, res) => {
    //handle with passport 
    req.logout(); 
    res.redirect(CLIENT_HOME_PAGE_URL); 
}); 

//failre redirect 
// router.get('/login/failed', (req, res) => {
//     res.status(401).json({
//         success: false, 
//         message: 'user failed to authenticate'
//     }); 
// }); 

//google auth 
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'openid', 'email'],
    failureRedirect: CLIENT_HOME_PAGE_URL
  })
);

// google auth redirect 
// router.get('/google/redirect', passport.authenticate('google', {
//         session: false,
//         successRedirect: 'http://localhost:3000/splash/' + req.user.id, 
//         failureRedirect: '/auth/login/failed', 
//     })
// ); 

// //google auth redirect 
router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
  console.log(req.user)  
  if (process.env.NODE_ENV === 'production') {
    // final aws url 
    res.redirect('/splash/' + req.user.id)
  } else {
    res.redirect('http://localhost:3000/splash/' + req.user.id)
  }
}); 


router.get('/dashboard', (req, res) => {
  res.send()
}); 


module.exports = router;