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

const credentialController = {
  getCredentials: jest.fn().mockImplementation(async (req, res, next) => {
    // res.locals.credentials = {
    //   accessKeyId: 'mocked-access-key-id',
    //   secretAccessKey: 'mocked-secret-access-key',
    //   sessionToken: 'mocked-session-token'
    // };
    res.locals.credentials = STSClient.send().Credentials;
    return next();
  }),
};

module.exports = credentialController;

//create a new mock object of the credentials controller with the same properties and methods as the original credentialController object.
//then, override the getCredentials method to return a predefined set of credentials instead of making an actual request to the AWS STS service.
