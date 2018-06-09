const jwtAuth = require('socketio-jwt-auth');
const User = require('../models/user');
const config = require('../environment/config');

module.exports = (io)=>{
    
    // using middleware
    io.use(jwtAuth.authenticate({
        secret: config.mongodb.secret,    // required, used to verify the token's signature
        // algorithm: 'HS256',        // optional, default to be HS256
        succeedWithoutToken: false
    }, function(payload, done) {
        console.log('This is executed');
        console.log(payload);
        // done is a callback, you can use it as follows
        if(payload && payload.sub){
            User.getUserById( payload.sub, function(err, user) {
                if (err) {
                    // return error
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    // return fail with an error message
                    return done(null, false, 'user does not exist');
                }
                // return success with a user info
                console.log('Authentication');
                return done(null, user);
            });
        }
        else{
            return done();
        }
        
    }));

    io.on('connection', function(socket) {
        console.log('Authentication passed!');
        // now you can access user info through socket.request.user
        // socket.request.user.logged_in will be set to true if the user was authenticated
        socket.emit('success', {
          message: 'success logged in!',
          user: socket.request.user
        });
      });
}
