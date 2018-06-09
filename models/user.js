const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../environment/config');

//User Schema
const UserSchema =new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        // required:true
    },
    googleid:{
        type:String
    },
    username:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    }
})

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = (id,callback)=>{
    User.findById(id,callback);
}

module.exports.getUserByUsername = (username,callback)=>{
    const query = {username:username};
    User.findOne(query,callback);
}

module.exports.addUser = (newuser,callback)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newuser.password,salt,(err,hash)=>{
            if(err) throw err;
             newuser.password = hash;
             newuser.save(callback);
        })
    })
}

module.exports.comparePassword = (candidatePassword,hash,callback)=>{
    bcrypt.compare(candidatePassword,hash,(err,ismatch)=>{
        if(err) throw err;
        return callback(null,ismatch);
    })
}