var express = require('express');
var router = express.Router();
var Log = require('../models/logmodels');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
/* GET users listing. */
router.get('/',function(req,res,next){
    res.send('LOGS');
});
router.get('/getone',function(req,res,next){

    var name = req.body.name;
    
    Log.getUserByName(name,function(err,name){
        if(err) throw err;
        if(!name) return res.json({success:false,msg:"ERROR: NO SUCH NAME"});
        
    });
        
});
router.get('/getall',function(req,res,next){
    var test = [{shit:"name",shito:"dick"},{shit:"jepoy",shito:"pussy"}];
    Log.getAll(function(err,doc){
        if(err) throw err;
        if(!doc)
            return res.json({success:false,msg:"ERROR: NO SUCH NAME"});
        if(doc)
            return doc;
    });
    
});
module.exports = router;