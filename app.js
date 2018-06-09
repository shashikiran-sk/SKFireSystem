var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const passportGoogle = require('./environment/passport_google');

var User = require('./models/user');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todos');
var excelRouter = require('./routes/excel');

//Config
var config = require('./environment/config');

var app = express();
//CORS Middleware
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(config.mongodb.mongodbURI,{dbName:"skfiresystem"},(err)=>{
    if(err){
        // throw err;
        process.exit(1);
    }
});

mongoose.connection.on('connected',()=>{
    console.log('MongoDB Connection Successful');
})
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting to MongoDB');
    
})



//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./environment/passport')(passport);

// mongoClient.connect(config.mongodbURI,{useNewUrlParser: true}, function(err, client) {
//     if(err) console.log(err);
//     else{
//         const db=client.db("test");
//         // const collection = client.db("test").getCollectionNames();
//         db.listCollections().toArray(function(err, collInfos) {
//             // collInfos is an array of collection info objects that look like:
//             // { name: 'test', options: {} }
//             console.log(collInfos);
//         });
//         // perform actions on the collection object
        
//         console.log()
//         client.close();
//     }
//  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos',todoRouter);
app.use('/excel',excelRouter);

app.use('*',indexRouter);

module.exports = app;
