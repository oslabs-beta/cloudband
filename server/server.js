const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cpuMetricsController = require('./controllers/ec2/cpuMetricsController');
const networkMetricsController = require('./controllers/ec2/networkMetricsController');
const instancesController = require('./controllers/ec2/instancesController');
const credentialController = require('./controllers/credentialController');
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

//handles requests for ec2 network metrics
app.get(
  '/api/network-in-out',
  credentialController.getCredentials,
  instancesController.getInstances,
  networkMetricsController.getNetworkMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);

//handles requests for ec2 cpu metrics and credits
app.get(
  '/api/cpu-credits',
  credentialController.getCredentials,
  instancesController.getInstances,
  cpuMetricsController.getCPUMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.chartData);
  }
);

//get Lambda function names
app.get(
  '/api/getLambdaNames',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaNames);
  }
);
//handles requests for lambda logs and metrics
app.get(
  '/api/getLambdaMetrics',
  credentialController.getCredentials,
  lambdaLogsController.getLambdaLogs,
  lambdaMetricsController.getLambdaMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaMetricsLogs);
  }
);

app.delete('/api/logout', sessionController.logout, (req, res) => {
  return res.status(200).send();
});

// sign up
app.post('/api/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals);
});

// handles sign in request
app.post(
  '/api/signin',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

//checks if user is logged in
app.get('/api/checkSession', sessionController.isLoggedIn, (req, res) => {
  return res.status(200).json(res.locals);
});
// 404 error handler :)
app.get('*', (req, res) => {
  return res.status(404).send('This page does not exist.');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
