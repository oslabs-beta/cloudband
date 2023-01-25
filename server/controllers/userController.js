const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

// creates new user
userController.createUser = async (req, res, next) => {
  try {
    const { email, password, RoleARN, region } = req.body;

    const newUser = await User.create({
      email: email,
      password: password,
      RoleARN: RoleARN,
      region: region,
    });
    res.locals.newUser = newUser;
    return next();
  } catch (err) {
    next({
      log: `Error in userController.createUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.createUser' },
    });
  }
};

// confirms user has correct username and password
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await User.find({ email: email });
    const pwCheck = await bcrypt.compare(password, userData[0].password);
    if (!pwCheck) {
      throw new Error('Password is incorrect');
    } else {
      const { RoleARN, region, _id } = userData[0];
      res.locals.newUser = { RoleARN, region, _id };
      return next();
    }
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser. Details: ${err}`,
      message: { err: 'An error occurred in userController.verifyUser' },
    });
  }
};

module.exports = userController;
