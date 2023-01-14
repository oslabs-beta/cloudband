const sessionController = {};
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

sessionController.startSession = async (req, res, next) => {
  try {
    await Session.create({ cookieId: res.locals.ssidCookie });
    console.log('success creating session');
    return next();
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in sessionController.startSession. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.startSession' },
    });
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    return next();
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in sessionController.isLoggedIn. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.isLoggedIn' },
    });
  }
};

module.exports = sessionController;
