var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');
mongoose.Promise = require('bluebird');
//user schema
var logschema = mongoose.Schema({
    name: {
        type:String
    },
    platenumber:{
        type:String
    },
    vehicletype: {
        type:String
    },
    location:
        {
            street: {
                type:String
            },
            city: {
                type:String
            },
            cc: {
                type:String
            }
        },
    time: 
        {
            date: {
                month:{
                    type:String
                },
                dayN:{
                    type: String
                },
                year:{
                    type:String
                },
                dayS:{
                    type:String
                }
            },
            time: {
                type:String
            }
        }
});

var Log = module.exports = mongoose.model('Log',logschema);

module.exports.getUserByName =  function(name,callback){
  var query = {
      name:name
  };
  Log.findOne(query,callback);
};
module.exports.getAll = function(callback){
Log.find({},callback);
};