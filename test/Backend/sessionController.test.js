// This file contains tests for the sessionController module. It uses Jest to test the startSession function, which creates a session in the database, and the isLoggedIn function, which checks if a user is logged in by checking if a session exists in the database. It also tests the global error handler to ensure that it is called if an error is thrown while creating a session or checking if a user is logged in.


const sessionController = require('../../server/controllers/sessionController.js');
//declare a variable session and require 
const Session = require('../../server/models/sessionModel.js');

//This test file contains comments for each line, describing the purpose of the code and the expected behavior of the test. It uses Jest's spy functionality to mock the behavior of the Session.create method and the next function, and it uses Jest's matchers to assert that the code behaves as expected. 

// Test suite for the sessionController module
describe('sessionController', () => {
  // Test suite for the startSession function
  describe('startSession', () => {
    // Test that a session is created and the next function is called without throwing an error
    it('should create a session and call the next function without throwing an error', async () => {
      // Initialize request and response objects
      const req = {};
      const res = { locals: { ssidCookie: '123' } };
      // Initialize a spy function for the next function
      const next = jest.fn();
      // Spy on the Session.create method
      const createSpy = jest.spyOn(Session, 'create').mockResolvedValue();

      // Call the startSession function
      await sessionController.startSession(req, res, next);

      // Assert that the Session.create method was called with the correct cookieId
      expect(createSpy).toHaveBeenCalledWith({ cookieId: '123' });
      // Assert that the next function was called
      expect(next).toHaveBeenCalled();
    });

    // Test that the global error handler is called if an error is thrown while creating a session
    it('should call the global error handler if an error is thrown while creating a session', async () => {
      // Initialize request and response objects
      const req = {};
      const res = { locals: { ssidCookie: '123' } };
      // Initialize a spy function for the next function
      const next = jest.fn();
      // Initialize an error object
      const error = new Error('Error creating session');
      // Spy on the Session.create method and make it return a rejected promise
      jest.spyOn(Session, 'create').mockRejectedValue(error);

      // Call the startSession function
      await sessionController.startSession(req, res, next);

      // Assert that the next function was called with the appropriate error object
      expect(next).toHaveBeenCalledWith({
        log: `Error in sessionController.startSession. Details: ${error}`,
        message: { err: 'An error occurred in sessionController.startSession' },
      });
    });
  });
});




//ONLY tests TWO specific scenarios: 
//1. the successful creation of a session and the correct call of the next function.
//2. An error thrown while creating a session and the correct call of the global error handler 

describe('sessionController', () => {
  describe('startSession', () => {
    // Test that a session is created and the next function is called
    // without throwing an error
    it('should create a session and call the next function without throwing an error', async () => {
      // Initialize request and response objects
      const req = {};
      const res = { locals: { ssidCookie: '123' } };
      // Initialize a spy function for the next function
      const next = jest.fn();
      // Spy on the Session.create method
      const createSpy = jest.spyOn(Session, 'create').mockResolvedValue();

      // Call the startSession function
      await sessionController.startSession(req, res, next);

      // Assert that the Session.create method was called with the correct cookieId
      expect(createSpy).toHaveBeenCalledWith({ cookieId: '123' });
      // Assert that the next function was called
      expect(next).toHaveBeenCalled();
    });

    // Test that the global error handler is called if an error is thrown
    // while creating a session
    it('should call the global error handler if an error is thrown while creating a session', async () => {
      // Initialize request and response objects
      const req = {};
      const res = { locals: { ssidCookie: '123' } };
      // Initialize a spy function for the next function
      const next = jest.fn();
      // Initialize an error object
      const error = new Error('Error creating session');
      // Spy on the Session.create method and make it return a rejected promise
      jest.spyOn(Session, 'create').mockRejectedValue(error);

      // Call the startSession function
      await sessionController.startSession(req, res, next);

      // Assert that the next function was called with the appropriate error object
      //NOTE!! If the web app is not live and running with a user's input ARN, this test will fail. And it SHOULD FAIL unless the web app is running
      expect(next).toHaveBeenCalledWith({
        log: `Error in sessionController.startSession. Details: ${error}`,
        message: { err: 'An error occurred in sessionController.startSession' },
      });
    });
  });
});
