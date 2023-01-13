const userController = {};

// confirms user has correct username and password
userController.verifyUser = async (req, res, next) => {
  try {
    // takeing username and pw from body of request
    const { username, password } = req.body;
    // logic to find if the user is in the DB & has correct PW
    const userData = await User.find({ username: username });
    if (userData[0].password === password) {
      return next();
    }
    // error handling for incorrect password
    else throw new Error('Password is incorrect');
  } catch (err) {
    // send to global error handler
    next({
      log: `Error in userController.verify. Details: ${err}`,
      message: { err: 'An error occurred in userController.verifyUser' },
    });
  }
};

module.exports = userController;
