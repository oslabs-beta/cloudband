const credentialController = require('../../__mocks__/credentialController');

//
describe('credentialController', () => {
  const arn = 'arn:aws:iam::123456789:role/example-role';
  const req = { query: { arn } };
  const res = { locals: {} };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCredentials', () => {
    it('should get credentials', async () => {
      await credentialController.getCredentials(req, res, next);
      expect(res.locals.credentials).toEqual({
        accessKeyId: 'mocked-access-key-id',
        secretAccessKey: 'mocked-secret-access-key',
        sessionToken: 'mocked-session-token',
      });
      expect(next).toHaveBeenCalled();
    });
  });
});
