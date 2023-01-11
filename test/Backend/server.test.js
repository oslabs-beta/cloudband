//declare a constant called request and require the supertest module
const request = require('supertest');
//declare a constant server and require the server file
const server = require('./server');
const cloudWatchController = require('./controllers/aws/cloudWatchController');
const instancesController = require('./controllers/aws/instancesController');
const credentialController = require('./controllers/user/credentialController');

//mock the controllers so that they don't make actual requests to AWS
jest.mock('./controllers/aws/cloudWatchController');
jest.mock('./controllers/aws/instancesController');
jest.mock('./controllers/user/credentialController');

//describe the server so that we can test the routes
xdescribe('server', () => {
    //test that the /metricsRequest route returns JSON
    xit('should return JSON', async () => {
        //mock the cloudWatchController.getMetrics function
        cloudWatchController.getMetrics.mockImplementation((req, res, next) => {
            //mock the res.locals.chartData variable
            res.locals.chartData = { data: 'mocked data' };
            //call the next function
            next();
        });

        //mock the instancesController.getInstances function
        instancesController.getInstances.mockImplementation((req, res, next) => {
            //what goes here?
            next();
        });

        //mock the credentialController.getCredentials function
        credentialController.getCredentials.mockImplementation((req, res, next) => {
            //what goes here?
            next();
        });

        //declare a constant called response assigned to await the request to the server
        const response = await request(server).get('/metricsRequest');
        //expect the response status to be 200
        expect(res.status).toBe(200);
        //expect the response body to be equal to the mocked data
        expect(res.body).toEqual({ data: 'mocked data' });
    });

    //test that 404 errors are handled
    xit('should handle 404 errors', async () => {
        //declare a constant called response assigned to await the request to the server with a route that doesn't exist
        const response = await request(server).get('/notFound');
        //expect the response status to be 404
        expect(res.status).toBe(404);
        //expect the response body to be equal to the error message
        expect(res.body).toBe( 'This page does not exist');
     });
});
