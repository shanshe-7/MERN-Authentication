const JWT = require('jsonwebtoken');
const User = require('../models/users');
const {JWT_SECRET} = require('../configuration/index');


signToken = user => {
   return JWT.sign({
    iss: 'shanshe',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {

  signUp: async (req, res, next) => {
    const { email, password, firstname, lastname } = req.value.body;

    // Check if there is a user with the same email
    const findUser = await User.findOne({"local.email": email});
    if(findUser){
      return res.status(403).json({error: "Email already exists"})
    }

    // Create new user
    const newUser = new User({ 
      method: 'local',
      local: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      }
    });
    await newUser.save();

  
    // Generate  token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({token});


  }, 

  signIn: async (req, res, next) => {
    // Generate  token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  
  
  secret: async(req, res, next) => {
    res.json({ secret: 'resourse' });
  }
}


