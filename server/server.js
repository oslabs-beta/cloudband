const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudWatchController = require('./controllers/aws/cloudWatchController');
const instancesController = require('./controllers/aws/instancesController');
const credentialController = require('./controllers/aws/credentialController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const listLambdasController = require('./controllers/lambda/listLambdasController');
const invocationController = require('./controllers/lambda/invocationController');
const throttleController = require('./controllers/lambda/throttleController');
const errorsController = require('./controllers/lambda/errorsController');
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
//to do = this should be in the ENV file
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
  '/cpu-utilization',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudWatchController.getCPUUtilization,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/network-in-out',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudWatchController.getNetworkIn,
  cloudWatchController.getNetworkOut,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/cpu-credits',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudWatchController.getCPUCreditUsage,
  cloudWatchController.getCPUCreditBalance,
  cloudWatchController.getCPUSurplusCreditBalance,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
// get Lambda functions metrics
app.get(
  '/invocations',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  invocationController.getInvocationMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.invocations);
  }
);

app.get(
  '/throttles',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  throttleController.getThrottleMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.throttles);
  }
);

app.get(
  '/errors',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  errorsController.getErrorMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.errors);
  }
);

// sign up
app.post(
  '/signup',
  // (req, res) => console.log('entered route'),
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

app.get(
  '/metricsRequest',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  errorsController.getErrorMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.errors);
  }
);
