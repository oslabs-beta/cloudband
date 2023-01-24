const cookieController = require('../../server/controllers/cookieController.js');
const User = require('../../server/models/sessionModel.js');

describe('cookieController', () => {
    describe('setSSIDCookie', () => {
        // Test that a cookie is set and the next function is called without throwing an error
        it('should set a cookie and call the next function without throwing an error', async () => {
            // Initialize request and response objects
            const req = {};
            const res = {
                locals: {
                    newUser: {
                        _id: '123'
                    }
                },
                cookie: jest.fn()
            };
            // Initialize a spy function for the next function
            const next = jest.fn();

            await cookieController.setSSIDCookie(req, res, next);

            // Assert that the res.cookie method was called with the correct arguments
            expect(res.cookie).toHaveBeenCalledWith('ssid', '123', {
                httpOnly: true
            });
            // Assert that the next function was called
            expect(next).toHaveBeenCalled();
            // Assert that the ssidCookie was set to the user id
            expect(res.locals.ssidCookie).toEqual('123');
        });

        // Test that the global error handler is called if an error is thrown while setting the cookie. Please NOTE that this test is designed to fail if the web app is not live and running
        it('should call the global error handler if an error is thrown while setting the cookie', async () => {
            // Initialize request and response objects
            const req = {};
            const res = {
                locals: {
                    newUser: {
                        _id: '123'
                    }
                },
                cookie: jest.fn()
            };
            // Initialize a spy function for the next function
            const next = jest.fn();
            // Initialize an error object
            const error = new Error('Error setting cookie');

            // Spy on the User.findOne method and make it return a rejected promise
            //Note, when the web app is not live and running, this method will necessarily fail.
            jest.spyOn(User, 'findOne').mockRejectedValue(error);

            // Call the setSSIDCookie function
            await cookieController.setSSIDCookie(req, res, next);

            // Assert that the next function was called with the appropriate error object
            expect(next).toHaveBeenCalledWith({
                log: `Error in cookieController.setSSIDCookie. Details: ${error}`,
                message: { err: 'An error occurred in cookieController.setSSIDCookie' },
            });
            // Assert that the res.cookie method was not called
            expect(res.cookie).not.toHaveBeenCalled();
        });
    });
});

