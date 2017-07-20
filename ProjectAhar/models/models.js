var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
mongoose.Promise = require('bluebird');
//user schema
var userschema = mongoose.Schema({
   name:{
       type:String
   },
   email:{
       type:String,
       required:true,
       index:{
         unique:true
       }
   },
   contact:{
     type:Number,
     required:true
   },
   username:{
       type:String,
       required:true,
       index:{
         unique:true
       }
   },
   password:{
       type:String,
       required:true
   }
});

var User = module.exports = mongoose.model('User',userschema);

module.exports.getUserByID = function(id,callback){
    User.findById(id,callback);
};
module.exports.validateUser = function(username,callback){
  User.count({username:username},callback);
};
module.exports.getUserByName =  function(username,callback){
  var query = {
      username:username
  };
  User.findOne(query,callback);
};

module.exports.addUser = function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(newUser.password,salt,function(err,hash){
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
};
module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err){

        }
        callback(null,isMatch);
    });
};
