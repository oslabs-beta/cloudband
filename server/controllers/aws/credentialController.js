const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const dotenv = require('dotenv');
dotenv.config();

const credentialController = {};

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

credentialController.getCredentials = async (req, res, next) => {
  const { arn } = req.query;

  const info = {
    RoleArn: arn, //will receive from front end
    RoleSessionName: 'CloudbandRoleSession',
    DurationSeconds: 900,
    ExternalId: process.env.EXTERNAL_ID_,
  };

  //1st Step: Send ARN, RoleSessionName, and ExternalId to AWS STS
  const stsClient = new STSClient({ region: region, credentials: credentials });

  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    res.locals.toBeCached = res.locals.credentials;
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = credentialController;
