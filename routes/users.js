var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../environment/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',(req,res,next)=>{
  let newuser = new User({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  })

  User.addUser(newuser,(err,user)=>{
    if(err){
      res.json({success:false,msg:'Failed to register New User'});
    }
    else{
      res.json({success:true,msg:'User Registered'});
    }
  })
});

router.post('/login',(req,res,callback)=>{
  let user = new User({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  })

  User.getUserByUsername(user.username,(err,userfound)=>{
    if(err){
      throw err;
    }
    if(!userfound){
      return res.json({success:false,msg:'User not Found'});
    }

    User.comparePassword(user.password,userfound.password,(err,ismatch)=>{
      if(err) throw err;
      if(ismatch){
        const token = jwt.sign(userfound.toJSON(),config.mongodb.secret,{
          expiresIn:604800 //1 week
        });
        res.json({
          success:true,
          // token:'JWT ' + token,
          token:token,
          user:{
            id:userfound._id,
            name:userfound.name,
            username:userfound.username,
            email:userfound.email
            // googleid:userfound.googleid
          }
        });
      }
      else{
        return res.json({success:false,msg:'Wrong Password'});
      }
    })
  });

});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  res.json({user:req.user});
});

router.get('/google',passport.authenticate('google',{
  scope:['profile']
})); 

router.get('/google/oauth2callback',passport.authenticate('google'),(req,res)=>{
  console.log('This is executed');
  res.json(req.user);
  
})

module.exports = router;
