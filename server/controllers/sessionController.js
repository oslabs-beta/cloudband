const sessionController = {};
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

sessionController.startSession = async (req, res, next) => {
  try {
    // create a session (will throw an error if you try to login while already having a session token)
    await Session.create({ cookieId: res.locals.ssidCookie });
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
    const loggedInStatus = await Session.findOne({
      cookieId: res.locals.ssidCookie,
    });
    if (loggedInStatus) return next();
    else return sessionController.startSession(req, res, next);
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in sessionController.isLoggedIn. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.isLoggedIn' },
    });
  }
};

module.exports = sessionController;
