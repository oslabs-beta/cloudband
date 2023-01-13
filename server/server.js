const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudWatchController = require('./controllers/aws/cloudWatchController');
const instancesController = require('./controllers/aws/instancesController');
const credentialController = require('./controllers/aws/credentialController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');

// import routers and controllers

// invoke express
const app = express();
const PORT = 3000;
console.log('server is running');

// add cookie parser
app.use(cookieParser());

// use cors
app.use(cors());

// use express json
app.use(express.json());

// user cookie parser

// handle static files
app.use(express.static('src'));

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

// sign in
app.post('signin', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals); // need to send back token and cookie
});

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
