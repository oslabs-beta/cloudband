const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const dotenv = require('dotenv');
dotenv.config();

const credentialController = {};

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

//get user's access key id and secret access key from AWS
credentialController.getCredentials = async (req, res, next) => {
  const { arn, region } = req.query;
  const info = {
    RoleArn: arn,
    RoleSessionName: 'CloudbandRoleSession',
    DurationSeconds: 900,
    ExternalId: '92a98196-9090-11ed-a1eb-0242ac120002',
  };

  //create new STS client instance with cloudband's region and credentials
  const stsClient = new STSClient({ region: region, credentials: credentials });

  //send request to AWS to assume role in user's account to retrieve temporary credentials for read-only access
  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = credentialController;
