//create and invoke the StsClient mock
const STSClient = jest.fn();

//assign the credentials returned by the mock to the 'res.locals.credentials' object.
const credentialController = {
  getCredentials: jest.fn().mockImplementation(async (req, res, next) => {
    const STSClient = jest.fn().mockImplementation(() => {
      return {
        send: jest.fn().mockResolvedValue({
          Credentials: {
            accessKeyId: 'mocked-access-key-id',
            secretAccessKey: 'mocked-secret-access-key',
            sessionToken: 'mocked-session-token',
          },
        }),
      };
    });

    const response = await STSClient().send();
    res.locals.credentials = response.Credentials;
    return next();
  }),
};

module.exports = credentialController;




// const STSClient = jest.fn().mockImplementation(() => {
//   return {
//     send: jest.fn().mockResolvedValue({
//       Credentials: {
//         accessKeyId: 'mocked-access-key-id',
//         secretAccessKey: 'mocked-secret-access-key',
//         sessionToken: 'mocked-session-token',
//       },
//     }),
//   };
// });

// const credentialController = {
//   getCredentials: jest.fn().mockImplementation(async (req, res, next) => {
//     // res.locals.credentials = {
//     //   accessKeyId: 'mocked-access-key-id',
//     //   secretAccessKey: 'mocked-secret-access-key',
//     //   sessionToken: 'mocked-session-token'
//     // };
//     res.locals.credentials = STSClient.send().Credentials;
//     return next();
//   }),
// };

// module.exports = credentialController;
