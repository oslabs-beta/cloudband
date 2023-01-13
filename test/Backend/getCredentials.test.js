//const { describe, beforeEach } = require('node:test');
const credentialController  = require('../../server/controllers/user/credentialController');
const STSClient = require('@aws-sdk/client-sts').STSClient;

// Mocking the AWS SDK
//describe the credentialController and the getCredentials function
xdescribe('credentialController', () => {
    //declare the variables. arn is the role arn
    const arn = 'arn:aws:iam::123456789:role/example-role';
    //mock the request and response objects
    const req = { query: { arn } };
    const res = { locals: {} };
    //mock the next function
    const next = jest.fn();
    //declare the stsClient variable but leave it undefined
    let stsClient;

    //before each test, set the environment variables and create a new stsClient
    beforeEach(() => {
        //clear all mocks
        jest.clearAllMocks();
        //set the environment variables
        process.env.AWS_ACCESS_KEY = 'accessKeyId';
        process.env.AWS_SECRET_ACCESS_KEY = 'secretAccess';
        //create a new stsClient with a region of us-east-1
        stsClient = new STSClient({ region: 'us-east-1' });
    });

    //describe the getCredentials function
    xdescribe('getCredentials', () => {
        //test that the stsClient is called and the credentials are returned
        it('should get credentials', async () => {
            //mock the assumedRole variable
            const assumedRole = {
                //mock the Credentials object
                Credentials: {
                    AccessKeyId: 'accessKeyId',
                    SecretAccessKey: 'secret',
                    SessionToken: 'token',
                },
            };
            //mock the stsClient.send function to return the assumedRole variable
            stsClient.send = jest.fn().mockedResolvedValue(assumedRole);
            //call the getCredentials function and await the result
            await credentialController.getCredentials(req, res, next);
            //expect the stsClient.send function to have been called
            expect(stsClient.send).toHaveBeenCalled();
            //expect the res.locals.credentials to be equal to the assumedRole.Credentials object
            expect(res.locals.credentials).toEqual({
                accessKeyId: 'accessKeyId',
                secretAccessKey: 'secretAccessKey',
                sessionToken: 'sessionToken',
            });
            //expect the next function to have been called
            expect(next).toHaveBeenCalled();
        });

        //test that the stsClient is called and the credentials are returned
        it('should handle error', async () => {
            //mock the error variable
            const error = new Error('Error');
            //mock the stsClient.send function to return the error variable
            stsClient.send = jest.fn().mockRejectedValue(error);
            //mock the console.error function
            console.error = jest.fn();
            //call the getCredentials function and await the result
            await credentialController.getCredentials(req, res, next);
            //expect the stsClient.send function to have been called
            expect(stsClient.send).toHaveBeenCalled();
            //expect the console.error function to have been called with the error variable
            expect(console.error).toHaveBeenCalledWith(error);
            //expect the next function to have been called with the error variable
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});