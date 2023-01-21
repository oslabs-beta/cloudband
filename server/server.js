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
app.use(express.static('src'));

// get metrics
app.get(
  '/cpu-utilization',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getCPUUtilization,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/network-in-out',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getNetworkIn,
  cloudwatchController.getNetworkOut,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);
app.get(
  '/cpu-credits',
  credentialController.getCredentials,
  instancesController.getInstances,
  cloudwatchController.getCPUCreditUsage,
  cloudwatchController.getCPUCreditBalance,
  cloudwatchController.getCPUSurplusCreditBalance,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);

//get Lambda function names

app.get(
  '/getLambdaNames',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaNames);
  }
);
// get Lambda metrics by Each Function
app.get(
  '/getLambdaMetrics',
  credentialController.getCredentials,
  lambdaLogsController.getLambdaLogs,
  lambdaMetricsController.getLambdaMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaMetricsLogs);
  }
);

// sign up
app.post(
  '/signup',
  (req, res) => console.log('entered route'),
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
