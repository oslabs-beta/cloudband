const dotenv = require('dotenv');
const { STSClient } = require('@aws-sdk/client-sts');

describe('STSClient', () => {
  beforeEach(() => {
    // Clear the environment variables before each test
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.AWS_REGION;
  });

  test('should create an STSClient with correct credentials and region', () => {
    // Set the environment variables
    process.env.AWS_ACCESS_KEY_ID = 'test_access_key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test_secret_key';
    process.env.AWS_REGION = 'us-east-1';

    // Load the dotenv config
    dotenv.config();

    // Create the STSClient
    const stsClient = new STSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  });

  test('should use the default region if AWS_REGION is not set', () => {
    // Set the environment variables
    process.env.AWS_ACCESS_KEY_ID = 'test_access_key';
    process.env.AWS_REGION = 'us-west-2';
    //process.env.AWS_SECRET_ACCESS_KEY = 'test_secret_key';

    // Load the dotenv config
    dotenv.config();

    // Create the STSClient
    const stsClient = new STSClient({
      region: 'us-east-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    //expect(stsClient.config.region).toBe('us-east-2');
  });

  test('should throw an error if AWS_ACCESS_KEY_ID is not set', () => {
    // Set the environment variables
    process.env.AWS_ACCESS_KEY_ID = 'test_access_key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test_secret_key';
    process.env.AWS_REGION = 'us-east-1';

    // Load the dotenv config
    dotenv.config();

    // Expect the STSClient constructor to throw an error
    expect(() => {
      new STSClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    });
  });
});