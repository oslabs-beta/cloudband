import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import dotenv from 'dotenv';
dotenv.config();

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const stsClient = new STSClient({
  region: 'us-east-1',
  credentials: credentials,
});

const getCredentials = async (req, res, next) => {
  const info = {
    RoleArn: 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    RoleSessionName: 'CloudbandDelegationRole',
  };
  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
