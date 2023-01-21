const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

// creates new user
userController.createUser = async (req, res, next) => {
  console.log('entered Create User');
  try {
    console.log(req.body);
    // taking username and pw from body of request
    const { email, password, RoleARN, region } = req.body;
    // creating the user in the database

    const newUser = await User.create({
      email: email,
      password: password,
      RoleARN: RoleARN,
      region: region,
    });
    // pass of the newUser data
    res.locals.newUser = newUser;
    console.log('res.locals.newUser: ', res.locals.newUser);
    // TEMPORARY - checking to make sure i can find the user in the db
    const userData = await User.find({ email: email });
    console.log('FOUND USER IN DB: ', userData);
    return next();
    // else throw new Error('Password is incorrect');
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in userController.createUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.createUser' },
    });
  }
};

// confirms user has correct username and password
userController.verifyUser = async (req, res, next) => {
  try {
    // taking username and pw from body of request
    const { email, password } = req.body;
    // logic to find if the user is in the DB & has correct PW
    const userData = await User.find({ email: email });
    // if (userData[0].password === password) {
    //   return next();
    // }
    const pwCheck = await bcrypt.compare(password, userData[0].password);
    // error handling for incorrect password
    if (!pwCheck) {
      throw new Error('Password is incorrect');
    } else {
      res.locals.newUser = userData[0];
      console.log('password for user correct: ', userData);
      // console.log('userdata[0]._id', userData[0]._id);
      // console.log(
      //   'THIS IS THE USER id in res locals: ',
      //   res.locals.newUser._id
      // );
      return next();
    }
    // else throw new Error('Password is incorrect');
  } catch (err) {
    // send to global error handler
    console.log('error in verifyuser');
    return next({
      log: `Error in userController.verifyUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.verifyUser' },
    });
  }
};

module.exports = userController;
