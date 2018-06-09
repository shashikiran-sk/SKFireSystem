var mongoose = require('mongoose');
var User = require('./user');

var TodoSchema = new mongoose.Schema({
    value:{
        type:String,
        required:true
    },
    time:{
        type:Date,
    },
    userid:{
        type:String
    }
});

const Todo=module.exports = mongoose.model('Todo',TodoSchema);

module.exports.addTodo = (todo,callback)=>{
    todo.save(callback);
}

module.exports.getTodo = (userid,callback)=>{
    Todo.find({userid:userid},callback);
}

module.exports.deleteTodo = (id,callback)=>{
    Todo.deleteOne({_id:id},callback);
}