const { X509Certificate } = require('crypto');
const { beforeEach, it } = require('node:test');
const cloudwatchController = require('./cloudwatchController');
const CloudWatchClient = require('@aws-sdk/client-cloudwatch').CloudWatchClient;

//describe the cloudwatchController test in order to 
xdescribe('cloudwatchController', () => {
    //declare a constant called req and set it to an empty object
    const req = {};
    //declare a constant called res and set it to an object with a locals property
    //the locals property contains an object with a credentials property. The credentials property contains an object with accessKeyId, secretAccessKey, and sessionToken properties
    const res = { locals: { credentials: { accessKeyId: 'accessKeyId', secretAccessKey: 'secretAccessKey', sessionToken: 'sessionToken' }, ec2Instances: { instances: ['i-123456789', 'i-2345789'] } } };
    //declare a constant called next and set it to a jest function
    const next = jest.fn();
    //declare a variable called cloudwatchClient and leave it undefined
    let cloudwatchClient;

    //before each test, clear all mocks and create a new cloudwatchClient
    beforeEach(() => {
        jest.clearAllMocks();
        cloudwatchClient = new CloudWatchClient({ region: 'us-east-1', credentials: res.locals.credentials });
    });

    //describe the getMetrics function
    xdescribe('getMetrics', () => {
        //test that the cloudwatchClient is called and the metrics are returned
        xit('should get metrics', async () => {
            //mock the responses variable
            const responses = { MetricDataResults: [{ Values: [1, 2, 3], Timestamps: ['Timestamp1', 'Timestamp2'] }] };
            cloudwatchClient.send = jest.fn().mockResolvedValue(responses);
            //call the getMetrics function and await the result
            await cloudwatchController.getMetrics(req, res, next);
            //expect the cloudwatchClient.send function to have been called
            expect(cloudwatchClient.send).toHaveBeenCalled();
            //expect the res.locals.chartData to be equal to the responses.MetricDataResults object
            expect(res.locals.chartData).toEqual({ 
                values: [[1, 2, 3], [1, 2, 3]],
                timestamps: [ 'Timestamp1', 'Timestamp2' ], 
                instanceIds: ['i-12345678', 'i-23456789'] 
            });
            //expect the next function to have been called
            expect(next).toHaveBeenCalled();
        });
        //test that the cloudwatchClient is called and the metrics are returned
        xit('should handle error', async () => {
            //declare a constant called error and set it to a new Error object
            const error = new Error('Error');
            //mock the cloudwatchClient.send function to return a rejected promise with the error
            cloudwatchClient.send = jest.fn().mockRejectedValue(error);
            //call the getMetrics function and await the result
            await cloudwatchController.getMetrics(req, res, next);
            //expect the cloudwatchClient.send function to have been called
            expect(cloudwatchClient.send).toHaveBeenCalled();
            //expect the next function to have been called with the error
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});