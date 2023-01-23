const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cloudwatchController = require('./controllers/aws/cloudwatchController');
const instancesController = require('./controllers/aws/instancesController');
const credentialController = require('./controllers/aws/credentialController');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const listLambdasController = require('./controllers/lambda/listLambdasController');
const lambdaMetricsController = require('./controllers/lambda/lambdaMetricsController');
const lambdaLogsController = require('./controllers/lambda/lambdaLogsController');
const cacheController = require('./controllers/cacheController');

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
// app.use(express.static('src'));

// get metrics
app.get(
  '/cpu-utilization',
  cacheController.cacheGet,
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getCPUUtilization,
  cacheController.cacheSet,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/network-in-out',
  cacheController.cacheGet,
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getNetworkIn,
  cloudwatchController.getNetworkOut,
  cacheController.cacheSet,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/cpu-credits',
  cacheController.cacheGet,
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getCPUCreditUsage,
  cloudwatchController.getCPUCreditBalance,
  cloudwatchController.getCPUSurplusCreditBalance,
  cacheController.cacheSet,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);

//get Lambda function names

app.get(
  '/getLambdaNames',
  cacheController.cacheGet,
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  cacheController.cacheSet,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaNames);
  }
);

app.get(
  '/getLambdaMetrics',
  cacheController.cacheGet,
  credentialController.getCredentials,
  lambdaLogsController.getLambdaLogs,
  lambdaMetricsController.getLambdaMetrics,
  cacheController.cacheSet,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaMetricsLogs);
  }
);

// sign up
app.post(
  '/signup',
  (req, res, next) => {
    console.log('req.body', req.body);
    return next();
  },
  userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    // return res.status(200).json('successful request'); // need to send back token and cookie
    return res.status(200).json(res.locals); // need to send back token and cookie
  }
);

// sign in
app.post(
  '/signin',
  (req, res, next) => {
    console.log('req.body', req.body);
    return next();
  },
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  // sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals); // need to send back token and cookie
    // return res.status(200).json('successful request'); // need to send back token and cookie
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
