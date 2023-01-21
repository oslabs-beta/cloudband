const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudWatchController = require('./controllers/aws/cloudwatchController');
const instancesController = require('./controllers/aws/instancesController');
const credentialController = require('./controllers/aws/credentialController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const mongoose = require('mongoose');

mongoose
  .connect(`${process.env.MONGO_URI_}`, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'));

// import routers and controllers

// invoke express
const app = express();
const PORT = 3000; // put in ENV file
console.log('server is running');

// add cookie parser
app.use(cookieParser());

// use cors
// const corsOptions = {
//   origin: 'http://0.0.0.0:8080',
//   credentials: true,
// };
app.use(cors());

// use express json
app.use(express.json());

// handle static files
// if (process.env.NODE_ENV === 'production') {
//   console.log('this is the production environment');
//   app.use(express.static('dist'));
// } else if (process.env.NODE_ENV === 'development') {
//   console.log('this is the development environment');
//   app.use(express.static('src'));
// }
app.use(express.static('dist'));

// get metrics
app.get(
  '/metricsRequest',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudWatchController.getMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);

// sign up
app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals); // need to send back token and cookie
  }
);

// sign in
app.post(
  '/signin',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals); // need to send back token and cookie
  }
);

// 404 error handler :)
app.get('*', (req, res) => {
  return res.status(404).send('This page does not exist.');
});

// global error handler :(
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// set it to listen to a port
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});

// exports (express app)
module.exports = app;
