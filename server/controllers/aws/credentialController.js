console.log('entered CredentialController');
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const dotenv = require('dotenv');
dotenv.config();

const credentialController = {};

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

console.log('credentials', credentials);
credentialController.getCredentials = async (req, res, next) => {
  const { arn } = req.query;
  const info = {
    RoleArn: arn, //will receive from front end
    RoleSessionName: 'CloudbandRoleSession',
    DurationSeconds: 900,
    ExternalId: '92a98196-9090-11ed-a1eb-0242ac120002',
  };

  console.log('entered credentialController.getCredentials');
  //1st Step: Send ARN, RoleSessionName, and ExternalId to AWS STS
  const stsClient = new STSClient({ region: region, credentials: credentials });

  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    console.log('accessKeyId', accessKeyId);
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    // console.log('secretAccessKey', secretAccessKey);
    const sessionToken = assumedRole.Credentials.SessionToken;
    // console.log('sessionToken', sessionToken);
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    console.log('res.locals.credentials', res.locals.credentials);
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = credentialController;
