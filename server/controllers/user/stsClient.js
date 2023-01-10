const dotenv = require('dotenv');
dotenv.config();
const { STSClient } = require('@aws-sdk/client-sts');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
// const region = process.env.AWS_REGION;
const region = 'us-east-1';
const stsClient = new STSClient({
  region: region,
  credentials: credentials,
});

module.exports = {
  stsClient,
};
