const sessionController = {};
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

//create a new session based on SSID cookie
sessionController.startSession = async (req, res, next) => {
  try {
    await Session.create({ cookieId: res.locals.ssidCookie });
    return next();
  } catch (err) {
    next({
      log: `Error in sessionController.startSession. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.startSession' },
    });
  }
};

// log out user based on SSID cookie
sessionController.logout = async (req, res, next) => {
  const { ssid } = req.cookies;
  try {
    await Session.deleteOne({ cookieId: ssid });
    return next();
  } catch (err) {
    next({
      log: `Error in sessionController.logout. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.logout' },
    });
  }
};

//verify that user is logged in based on SSID cookie
sessionController.isLoggedIn = async (req, res, next) => {
  const { ssid } = req.cookies;
  try {
    const loggedInStatus = await Session.findOne({
      cookieId: ssid,
    });
    if (loggedInStatus) {
      const userData = await User.find({ _id: ssid });
      const { RoleARN, region, _id } = userData[0];
      res.locals.user = { RoleARN, region, _id };
    }
    return next();
  } catch (err) {
    next({
      log: `Error in sessionController.isLoggedIn. Details: ${err}`,
      message: { err: 'An error occurred in sessionController.isLoggedIn' },
    });
  }
};

module.exports = sessionController;
