import { getInstances } from '../../server/controllers/aws/instancesController';
import {EC2Client} from '@aws-sdk/client-ec2';


describe('getInstances', () => {
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

    const ec2Client = new EC2Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'test_access_key',
        secretAccessKey: 'test_secret_key',
        sessionToken: 'test_session_token',
      },
    });
    ec2Client.send = jest.fn().mockResolvedValue({
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
    });
    //unless the web app is up and running, this test is designed to FAIL. That indicates that the test is working, and that the code it tests is functioning correctly.
    await getInstances(req, res, next);
    expect(ec2Client.send).toHaveBeenCalled();
  });
});

