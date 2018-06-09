var express = require('express');
var router = express.Router();
var passport = require('passport');

var Todo = require('../models/todo');

router.post('/add',passport.authenticate('jwt',{session:false}), (req,res)=>{
    const newTodo=new Todo({
        value:req.body.value,
        time:req.body.time,
        userid:req.user._id
    })
    Todo.addTodo(newTodo,(err,todo)=>{
        if(err) throw err;
        res.json(todo);
    });
})

router.get('/get',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Todo.getTodo(req.user._id,(err,todos)=>{
        if(err) throw err;
        res.json(todos);
    })
})

router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Todo.findByIdAndRemove(req.body.id,(err,todo)=>{
        if(err) throw err;
        res.json(todo);
    })
})
module.exports = router;