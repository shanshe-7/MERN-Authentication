const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// connect to mongoDB URL 
const dbURL = 'mongodb+srv://shanshe:qazwsxedc123@cluster0.dats6.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('connected to db'))
    .catch((err) => console.log(err));

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

mongoose.connection.on('connected', ()=>{
    console.log("mongoose is connected");
});

//Route
app.use('/users', require('./routes/users'));

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}

//Start the server
const port = process.env.PORT || 8000;
app.listen(port);
