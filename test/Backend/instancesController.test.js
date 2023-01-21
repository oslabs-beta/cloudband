const { getInstances } = require('../../__mocks__/instancesController');

const EC2Client = require('@aws-sdk/client-ec2');

jest.mock('@aws-sdk/client-ec2', () => {
  return {
    EC2Client: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockResolvedValue({
          Reservations: [
            {
              Instances: [
                {
                  InstanceId: 'i-12345678',
                },
                {
                  InstanceId: 'i-87654321',
                },
              ],
            },
          ],
        }),
      };
    }),
  };
});

xdescribe('getInstances', () => {
  test('should call the EC2Client with the correct parameters', async () => {
    const req = {};
    const res = {
      locals: {
        credentials: {
          accessKeyId: 'test_access_key',
          secretAccessKey: 'test_secret_key',
          sessionToken: 'test_session_token',
        },
      },
    };
    const next = jest.fn();

    await getInstances(req, res, next);

    expect(EC2Client).toHaveBeenCalledWith({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'test_access_key',
        secretAccessKey: 'test_secret_key',
        sessionToken: 'test_session_token',
      },
    });
  });
});

// const { instancesController } = require('../../__mocks__/instancesController');


// describe('instancesController', () => {
//   describe('getInstances', () => {
//     it('should create an EC2Client and call the send method', async () => {
//       const EC2ClientMock = jest.fn();
//       const DescribeInstancesCommandMock = jest.fn();
//       const ec2ClientMock = { send: jest.fn() };
//       EC2ClientMock.mockImplementation(() => ec2ClientMock);
//       ec2ClientMock.send.mockResolvedValue({});
  
//       const instancesController = require('./instancesController');
//       const nextMock = jest.fn();
//       await instancesController.getInstances({}, {}, nextMock);
  
//       expect(EC2ClientMock).toHaveBeenCalled();
//       expect(ec2ClientMock.send).toHaveBeenCalledWith(new DescribeInstancesCommandMock({}));
//       expect(nextMock).toHaveBeenCalled();
//     });
  
//     it('should call next with an error if EC2Client.send throws', async () => {
//       const EC2ClientMock = jest.fn();
//       const ec2ClientMock = { send: jest.fn() };
//       EC2ClientMock.mockImplementation(() => ec2ClientMock);
//       const error = new Error('EC2Client.send failed');
//       ec2ClientMock.send.mockRejectedValue(error);
  
//       const instancesController = require('./instancesController');
//       const nextMock = jest.fn();
//       await instancesController.getInstances({}, {}, nextMock);
  
//       expect(nextMock).toHaveBeenCalledWith(error);
//     });
//   });
// });



// const instanceController = require('../../__mocks__/instancesController');
// const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
// //const DescribeInstancesCommand = jest.fn();



// jest.mock('@aws-sdk/client-ec2', () => {
//   return {
//     EC2Client: jest.fn().mockImplementation((DescribeInstancesCommand) => {
//       return {
//         send: jest.fn(() => DescribeInstancesCommand),
//       };
//     }),
//   };
// });

// describe('instanceController', () => {
//   const req = {};
//   const res = {
//     locals: {
//       credentials: {
//         accessKeyId: 'accessKeyId',
//         secretAccessKey: 'secretAccessKey',
//         sessionToken: 'sessionToken',
//       },
//     },
//   };
//   const next = jest.fn();

//   let ec2Client;
//   const instancesData = {
//     Reservations: [
//       {
//         Instances: [
//           {
//             InstanceId: 'i-12345678',
//           },
//           {
//             InstanceId: 'i-23456789',
//           },
//         ],
//       },
//     ],
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     ec2Client = new EC2Client(res.locals.credentials);
//     ec2Client.send.mockResolvedValue(instancesData);
//   });

//   describe('getInstances', () => {
//     it('should get instances', async () => {
//       await instanceController.getInstances(req, res, next);
//       expect(ec2Client.send).toHaveBeenCalledWith(DescribeInstancesCommand({}));
//       expect(res.locals.ec2Instances).toEqual({
//         instances: ['i-12345678', 'i-23456789'],
//       });
//       expect(next).toHaveBeenCalled();
//     });
//   }, 10000);
// });

// const mockedInstancesData = {
//   Reservations: [
//     {
//       Instances: [
//         {
//           InstanceId: 'i-12345678',
//         },
//         {
//           InstanceId: 'i-23456789',
//         },
//       ],
//     },
//   ],
// };

// jest.mock('@aws-sdk/client-ec2', () => {
// return {
//   EC2Client: jest.fn().mockImplementation(() => {
//     return {
//       send: jest.fn(() => mockedInstancesData),
//     };
//   }),
// };
// });


// describe('instanceController', () => {
//     const req = {};
//     const res = {
//       locals: {
//         credentials: {
//           accessKeyId: 'accessKeyId',
//           secretAccessKey: 'secretAccessKey',
//           sessionToken: 'sessionToken',
//         },
//       },
//     };
//     const next = jest.fn();
  
//     let ec2Client;
//     const instancesData = {
//       Reservations: [
//         {
//           Instances: [
//             {
//               InstanceId: 'i-12345678',
//             },
//             {
//               InstanceId: 'i-23456789',
//             },
//           ],
//         },
//       ],
//     };
  
//     beforeEach(() => {
//       jest.clearAllMocks();
//       ec2Client = new EC2Client(res.locals.credentials);
//       ec2Client.send.mockResolvedValue(instancesData);
//     });
  
//     describe('getInstances', () => {
//       it('should get instances', async () => {
//         await instanceController.getInstances(req, res, next);
//         expect(ec2Client.send).toHaveBeenCalledWith(DescribeInstancesCommand({}));
//         expect(res.locals.ec2Instances).toEqual({
//           instances: ['i-12345678', 'i-23456789'],
//         });
//         expect(next).toHaveBeenCalled();
//       });
//     }, 10000);
//   });
