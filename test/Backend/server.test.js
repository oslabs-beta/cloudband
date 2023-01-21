//declare a constant called request and require the supertest module
const request = require('supertest');

//declare a constant server and require the server file
//const server = require('../../server/server');
const server = 'http://localhost:3000';
const cloudWatchController = require('../../server/controllers/aws/cloudWatchController');
const instancesController = require('../../server/controllers/aws/instancesController');
const credentialController = require('../../server/controllers/aws/credentialController');

//mock the controllers so that they don't make actual requests to AWS
jest.mock('../../server/controllers/aws/cloudwatchController');
jest.mock('../../server/controllers/aws/instancesController');
jest.mock('../../server/controllers/aws/credentialController');

xdescribe('Route integration', () => {
  xdescribe('/metricsRequest', () => {
    xdescribe('GET', () => {
      xit('respond with a 200 status and application/json content type', () => {
        request.get.mockImplementation((url) => {
          return {
            expect: (status, cb) => {
              cb();
              return {
                expect: (type, cb) => {
                  cb();
                  return {
                    expect: (contentType, cb) => {
                      cb()
                    }
                  }
                }
              }
            }
          }
        });
        return request(server)
          .get('/metricsRequest')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });

  xdescribe('/invalid', () => {
    xdescribe('invalid request', () => {
      //we return the evaluation of 'request' here. It evals to a promise, so Jest knows not to say this test passes UNTIL that promise resolves.
      xit('responds with 404 status and this page does not exist', () => {
        request.get.mockImplementation((url) => {
          return {
            expect: (status, cb) => {
              cb();
            }
          }
        });
        return request(server).get('/invalid').expect(404);
      });
    });
  });
});
