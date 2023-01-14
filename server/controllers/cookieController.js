const cookieController = {};
const User = require('../models/userModel');

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    // assigning the newUserID data to a var - DOES THE MANGO GENERATED ID COME WITH THIS?
    const userId = res.locals.newUser._id;
    // IF I CANT GET THE ID LIKE THIS I WILL USE THIS METHOD (maybe need exec):
    // const user = await User.find({ email: req.body.email });
    // const userId = newUser[0]._id;
    // console.log('inside cookie controller:, ', userId);
    //creating cookie
    res.cookie('ssid', userId, {
      httpOnly: true,
    });
    res.locals.ssidCookie = userId;
    console.log('success creating ssid cookie: ', res.locals.ssidCookie);
    return next();
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in cookieController.setSSIDCookie. Details: ${err}`,
      message: { err: 'An error occurred in cookieController.setSSIDCookie' },
    });
  }
};

module.exports = cookieController;
