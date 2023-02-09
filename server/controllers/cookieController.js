//declare a cookieController object
const cookieController = {};

//set the SSID cookie based on user's _id in the database
cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    const userId = res.locals.newUser._id;
    res.cookie('ssid', userId, {
      httpOnly: true,
    });
    res.locals.ssidCookie = userId;
    return next();
  } catch (err) {
    next({
      log: `Error in cookieController.setSSIDCookie. Details: ${err}`,
      message: { err: 'An error occurred in cookieController.setSSIDCookie' },
    });
  }
};

module.exports = cookieController;
