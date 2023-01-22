const cookieController = require('../../server/controllers/cookieController.js');

describe('cookie', () => {
  describe('given a user id number', () => {
    it('should set res.locals.ssidCookie to the user id', async () => {
      const res = { locals: { newUser: { _id: 'hi' } }, cookie: jest.fn() };
      const ssidCookie = await cookieController.setSSIDCookie({}, res, () => {
        const result = res.locals.ssidCookie;
        return result;
      });
      expect(ssidCookie).toEqual('hi');
    });
  });
});
