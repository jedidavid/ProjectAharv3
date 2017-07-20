var express = require('express');
var router = express.Router();
var User = require('../models/models');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
/* GET users listing. */
router.get('/',function(req,res,next){
    res.send('USERS');
});

router.post('/register', function(req, res, next) {
  //res.send('REGISTER');
  let newUser = new User({
      name:req.body.name,
      email:req.body.email,
      contact:req.body.contact,
      username:req.body.username,
      password:req.body.password
  });
  User.validateUser(newUser.username,function(err,result){// validate user name
    if(err) throw err;
    if(!result){
      User.addUser(newUser,function(err,user){
              if(err){
                  res.json({success:false,msg:'failed to register user'});
              }else{
                  res.json({success:true,msg:'You are now registered'});
              }
            });
    }else{
      console.log(result);
      res.json({success:false,msg:'Username already registered'});
    }
  });
});


router.post('/authenticate', function(req, res, next) {
  //res.send('AUTHENTICATE');
  var username = req.body.username;
  var password = req.body.password;

  User.getUserByName(username,function(err,user){
      if(err){
          throw err;
      }
      if(!user){
          return res.json({success:false,msg:'User not found'});
      }

      User.comparePassword(password,user.password,function(err,isMatch){
          if(err){
              throw err;
          }
          if(isMatch){
              var token = jwt.sign(user,config.secret,{expiresIn:604800});//1week in secs604800
              res.json({
                  success:true,token:'JWT '+token,
                  user:{
                      id:user._id,
                      name:user.name,
                      contact:user.contact,
                      username:user.username,
                      email:user.email
                  }
              });
          }else{
              return res.json({success:false,msg:'Wrong password'});
          }
      });
  });
});

router.get('/profile',passport.authenticate('jwt',{session:false}), function(req, res, next) {
  res.json({user:req.user});
});
/*
router.get('/validate', function(req, res, next) {
  res.send('VALIDATE');
});*/
module.exports = router;
