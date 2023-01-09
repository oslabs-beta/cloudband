const AWS = require('aws-sdk');
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
//keeps keys secure
const dotenv = require('dotenv');
dotenv.config();
const queryString = require('queryString');
// const getCredentials = async (req, res, next) => {
//   const assumeRoleResult = AssumeRoleCommand()
// }

//set the region
// AWS.config.update({region:REGION});

// const sso = new AWS.SSO({apiVersion: '2019-06-10'});

const getCredentials = async (req, res, next) => {
  try {
    const { ROLE_ARN } = process.env;
    //create an STS client
    const sts = new STSClient({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    //assume the IAM role
    const { Credentials: credentials } = await sts.send(new AssumeRoleCommand({
      RoleArn: ROLE_ARN,
      RoleSessionName: 'sessionName'
    }));

    //set the AWS SDK credentials object
    AWS.config.credentials = credentials;
    
    //continue with the rest of the middleware or route handling
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error assuming IAM role');
  }
}


//const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
// const { dotenv } = require('dotenv').config();

// const credentialController = {};

// // const credentials = {
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   region: process.env.AWS_REGION,
// // };
// const region = 'us-east-1';
// const credentials = {
//   accessKeyId: 'AKIAUE2Y2VULDWWSMOFO',
//   secretAccessKey: '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',
// };

// const info = {
//   region: region,
//   credentials: credentials,
// };

// credentialController.getCredentials = async (req, res, next) => {
//   const stsClient = new STSClient(info);
//   const roleCredentials = {
//     RoleArn: 'arn:aws:iam::285264751894:role/CloudbandDelegationRole',
//     RoleSessionName: 'Cloudband Role Session',
//   };

//   try {
//     const assumedRole = await stsClient.send(
//       new AssumeRoleCommand(roleCredentials)
//     );
//     const accessKeyId = assumedRole.Credentials.AccessKeyId;
//     const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
//     const sessionToken = assumedRole.Credentials.SessionToken;
//     res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
//     return next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// module.exports = { credentialController };


// const stsClient = new STSClient({
//   region: 'us-east-1',
//   credentials: credentials,
// });

// const getCredentials = async (req, res, next) => {
//   const info = {
//     RoleArn: 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
//     RoleSessionName: 'CloudbandDelegationRole',
//   };
//   try {
//     const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
//     const accessKeyId = assumedRole.Credentials.AccessKeyId;
//     const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
//     const sessionToken = assumedRole.Credentials.SessionToken;
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };


// const getCredentials = async (req, res, next, roleArn, roleSessionName, authorizationCode) => {
//   const info = {
//     RoleArn: roleArn,
//     RoleSessionName: roleSessionName,
//   };
//   try {
//     //set the provided credentials in the request object so that they can be accessed later
//     const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
//     const accessKeyId = assumedRole.Credentials.AccessKeyId;
//     const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
//     const sessionToken = assumedRole.Credentials.SessionToken;

//     // Set the retrieved credentials in the request object so that they can be accessed later
//     req.accessKeyId = accessKeyId;
//     req.secretAccessKey = secretAccessKey;
//     req.sessionToken = sessionToken;

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

module.exports = getCredentials;