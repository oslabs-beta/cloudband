//declare a constant called request and require the supertest module
const request = require('supertest');
//declare a constant server and require the server file
//const server = require('../../server/server');
const server = 'http://localhost:3000';
const cloudWatchController = require('../../server/controllers/aws/cloudWatchController');
const instancesController = require('../../server/controllers/aws/instancesController');
const credentialController = require('../../server/controllers/user/credentialController');

//mock the controllers so that they don't make actual requests to AWS
jest.mock('../../server/controllers/aws/cloudwatchController');
jest.mock('../../server/controllers/aws/instancesController');
jest.mock('../../server/controllers/user/credentialController');

describe('Route integration', () => {
  describe('/metricsRequest', () => {
    describe('GET', () => {
      it('respond with a 200 status and application/json content type', () => {
        return request(server)
          .get('/metricsRequest')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  describe('/invalid', () => {
    describe('invalid request', () => {
      //we return the evaluation of 'request' here. It evals to a promise, so Jest knows not to say this test passes UNTIL that promise resolves.
      it('responds with 404 status and this page does not exist', () => {
        return request(server).get('/invalid').expect(404);
      });
    });
  });
});

//describe the server so that we can test the routes
// describe('server', () => {
//   let server = null;

//   afterEach(async () => {
//     await server.close();
//   });

//   //   afterAll(async () => {
//   //     await new Promise((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
//   //   });

//   beforeEach(() => {
//     // eslint-disable-next-line global-require
//     server = require('../../server/server');
//     jest.setTimeout(30000);
//   });
// afterAll(() => {
//     server.close();
// });
//test that the /metricsRequest route returns JSON
// it('should return JSON', async () => {
//   //mock the cloudWatchController.getMetrics function
//   cloudWatchController.getMetrics.mockImplementation((req, res, next) => {
//     //mock the res.locals.chartData variable
//     res.locals.chartData = { data: 'mocked data' };
//     //call the next function
//     next();
//   });

//   //mock the instancesController.getInstances function
//   instancesController.getInstances.mockImplementation((req, res, next) => {
//     //what goes here?
//     next();
//   });

//mock the credentialController.getCredentials function
// credentialController.getCredentials.mockImplementation((req, res, next) => {
//   //what goes here?
//   next();
// });

//declare a constant called response assigned to await the request to the server
//   const response = await request(server).get('/metricsRequest');
//   //expect the response status to be 200
//   expect(response.status).toBe(200);
//   //expect the response body to be equal to the mocked data
//   expect(response.body).toEqual({ data: 'mocked data' });
// });

// //test that 404 errors are handled
//   it('should handle 404 errors', (done) => {
//     // server
//     //     .get("/")
//     //     .expect(404)
//     //     .end(done);
//     //declare a constant called response assigned to await the request to the server with a route that doesn't exist
//     const response = request(server).get('/notFound');
//     console.log('response from 404 test: ', response);
//     //expect the response status to be 404
//     expect(response.status).toBe(404);
//     //expect the response body to be equal to the error message
//     expect(response.body).toBe('This page does not exist');
//   });
// });
// afterAll(() => {
//     server.close();
// });

// afterEach(async () => {
//     await queryClient.cancelQueries();  queryClient.clear();
// });

// afterAll(() => {
//   server.close();
// });
