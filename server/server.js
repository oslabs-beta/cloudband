const path = require('path');
const express = require('express');
const cors = require('cors');
const cloudWatchController = require('./controllers/aws/cloudWatchController');
const getCredentials = require('./controllers/user/getCredentials')

// add cookie parser

// import routers and controllers

// invoke express
const app = express();
const PORT = 3000;
console.log('server is running');
// use cors
app.use(cors());

// use express json
app.use(express.json());

// user cookie parser

// handle static files
app.use(express.static('src'));

// routes - this only works for hardcoded credentials
// app.get('/test', cloudWatchController.getMetrics, (req, res) => {
//   return res.status(200).json(res.locals.data);
// });
app.get('/test', getCredentials, cloudWatchController.getMetrics, (req, res) => {
  return res.status(200).json(res.locals.data);
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
