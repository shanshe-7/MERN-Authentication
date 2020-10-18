const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration/index');
const User = require('./models/users');


// JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exist handle it
        if(!user){
            return done(null, false)
        }

        // Othervise return the user
        done(null, user);
        
    } catch (error) {
        done(error, false);
    }
}));


// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given email
        const user = await User.findOne({ "local.email": email });

        // If user doesn't exist handle it
        if(!user){
            return done(null, false)
        }

        // Check if password is correct
        const isMatch = await user.isValidPassword(password);

        // If user doesn't exist handle it
        if(!isMatch){
            return done(null, false);
        }

        // Othervise return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));