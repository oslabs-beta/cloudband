const userController = require('../../server/controllers/userController.js');
const User = require('../../server/models/sessionModel.js');
const bcrypt = require('bcryptjs');

jest.mock('../../server/models/userModel');

//test the userController functions
describe('userController', () => {
//test the createUser function
  describe('createUser', () => {
    //test that a new user is created and the next function is called without throwing an error
    it('should create a new user and call the next function without throwing an error', async () => {
    //initialize request and response objects
      const req = {
        body: {
          email: 'test@email.com',
          password: 'testpassword',
          RoleARN: 'testarn',
          region: 'testregion',
        },
      };
    
      const res = { locals: {} };
      const next = jest.fn();
      User.create.mockResolvedValue({
        email: 'test@email.com',
        password: 'hashedpassword',
        RoleARN: 'testarn',
        region: 'testregion',
      });

    //call the createUser function
      await userController.createUser(req, res, next);

    //assert that the User.create method was called with the correct email, password, RoleARN, and region
      expect(User.create).toHaveBeenCalledWith({
        email: 'test@email.com',
        password: 'testpassword',
        RoleARN: 'testarn',
        region: 'testregion',
      });

      //assert that the res.locals.newUser object is set to the correct values
      expect(res.locals.newUser).toEqual({
        email: 'test@email.com',
        password: 'hashedpassword',
        RoleARN: 'testarn',
        region: 'testregion',
      });
      
      //assert that the next function was called
      expect(next).toHaveBeenCalled();
    });

    //test that the global error handler is called if an error is thrown while creating a user
    it('should call the global error handler if an error is thrown while creating a user', async () => {
    //initialize request and response objects
      const req = {
        body: {
          email: 'test@email.com',
          password: 'testpassword',
          RoleARN: 'testarn',
          region: 'testregion',
        },
      };
      const res = { locals: {} };
      const next = jest.fn();
      const error = new Error('Error creating user');
      User.create.mockRejectedValue(error);

      //call the createUser function
      await userController.createUser(req, res, next);

      //assert that the next function was called with the correct error message
      expect(next).toHaveBeenCalledWith({
        log: `Error in user Controller.createUser. Details: ${error}`,
        message: { err: 'An error occurred in userController.createUser' },
      });
    });
  });
});

//please note that this test is designed to fail and is not meant to be passed because the error thrown by the verifyUser fnction will not be caught by the test case. This is because the test case is not handling the thrown error and it will stop the execution of the test case.
//test the verifyUser function
describe('verifyUser', () => {
  //test that the user is verified and the next function is called without throwing an error
  it('should verify the user and call the next function without throwing an error', async () => {
    //mock the request, response, and next functions
    const req = { body: { email: 'test@email.com', password: 'testpassword' } };
    const res = { locals: {} };
    const next = jest.fn();

    //mock the User.find and bcrypt.compare functions
    User.find.mockResolvedValue([
      {
        email: 'test@email.com',
        password: 'hashedpassword',
        RoleARN: 'testarn',
        region: 'testregion',
        _id: '123',
      },
    ]);
    bcrypt.compare.mockResolvedValue(true);

    //call the verifyUser function
    await userController.verifyUser(req, res, next);

    //assert that the User.find and bcrypt.compare functions were called with the correct email and password
    expect(User.find).toHaveBeenCalledWith({ email: 'test@email.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'testpassword',
      'hashedpassword'
    );

    //assert that the res.locals.newUser object is set to the correct values
    expect(res.locals.newUser).toEqual({
      RoleARN: 'testarn',
      region: 'testregion',
      _id: '123',
    });
    //assert that the next function was called
    expect(next).toHaveBeenCalled();
  });
  
  //!!!please note that this test is designed to fail and is not meant to be passed
  //it checks to see if the global error handler is called if the password is incorrect, and it should fail because error thrown by the "verifyUser" function will not be caught by the test case. This is because the test case is not handling the thrown error and it will stop the execution of the test case.

  //test case to check if the global error handler is called if the password is incorrect
  it('should call the global error handler if the password is incorrect', async () => {
    //mock the request, response, and next functions
    const req = { body: { email: 'test@email.com', password: 'testpassword' } };
    const res = { locals: {} };
    const next = jest.fn();

    //mock the User.find and bcrypt.compare functions
    User.find.mockResolvedValue([
      {
        email: 'test@email.com',
        password: 'hashedpassword',
        RoleARN: 'testarn',
        region: 'testregion',
        _id: '123',
      },
    ]);
    bcrypt.compare.mockResolvedValue(false);

    //call the verifyUser function
    await userController.verifyUser(req, res, next);

    //check if the User.find and bcrypt.compare functions were called with the correct arguments
    expect(User.find).toHaveBeenCalledWith({ email: 'test@email.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'testpassword',
      'hashedpassword'
    );

    //check if the global error handler was called with the correct arguments
    expect(next).toHaveBeenCalledWith({
      log: 'Error in userController.verifyUser. Details: Error: Password is incorrect',
      message: { err: 'An error occurred in userController.verifyUser' },
    });
  });


//test case to check if the global error handler is called if an error is thrown while verifying the user
  it('should call the global error handler if an error is thrown while verifying the user', async () => {
    //mock the request, response, and next functions
    const req = { body: { email: 'test@email.com', password: 'testpassword' } };
    const res = { locals: {} };
    const next = jest.fn();
    const error = new Error('Error finding user');
    //mock the User.find function throwing an error
    User.find.mockRejectedValue(error);

    //call the verifyUser function
    await userController.verifyUser(req, res, next);

    //check if the User.find function was called with the correct arguments
    expect(User.find).toHaveBeenCalledWith({ email: 'test@email.com' });
    expect(next).toHaveBeenCalledWith({
      log: 'Error in userController.verifyUser. Details: ${error}',
      message: { err: 'An error occurred in userController.verifyUser' },
    });
  });
});
