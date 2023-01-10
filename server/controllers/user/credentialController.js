const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
// const { stsClient } = require('./stsClient');
const dotenv = require('dotenv');
dotenv.config();

const credentialController = {};

// const credentials = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// };
// const region = 'us-east-1';
// console.log('roleCred', roleCred);
// const roleCred = {
//   region: 'us-east-1',
// };

// const account = {
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAXIUZQMSZ2WRYRS4Y',
//     secretAccessKey: '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',
//   },
// };

const region = 'us-east-1';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

credentialController.getCredentials = async (req, res, next) => {
  const info = {
    RoleArn: 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    RoleSessionName: 'CloudbandRoleSession',
    // DurationSeconds: 900,
    ExternalId: '92a98196-9090-11ed-a1eb-0242ac120002',
  };

  console.log('entered credentialController.getCredentials');
  //1st Step: Send ARN, RoleSessionName, and ExternalId to AWS STS
  const stsClient = new STSClient({ region: region, credentials: credentials });
  // const stsClient = new STSClient(roleCred);
  // console.log('this is the sts client: ', stsClient);

  try {
    // console.log('AssumeRoleCommand: ', new AssumeRoleCommand(info));
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    // let stsCommand = new AssumeRoleCommand(info);
    // const stsResp = await stsClient.send(stsCommand);
    // console.log('THIS IS THE stsResp: ', stsResp);
    // console.log('assumedRole', assumedRole);
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    // console.log('accessKeyId', accessKeyId);
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
