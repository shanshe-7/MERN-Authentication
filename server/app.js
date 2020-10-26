const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { dbURL } = require('./configuration/index');

const app = express();
app.use(cors());

// connect to mongoDB URL
mongoose.connect(process.env.MONGODB_URI || dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Route
app.use('/users', require('./routes/users'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//Start the server
const port = process.env.PORT || 8000;
app.listen(port);
