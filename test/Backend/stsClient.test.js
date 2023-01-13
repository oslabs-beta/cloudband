//const { ExportClientVpnClientConfigurationCommand } = require('@aws-sdk/client-ec2');
const { stsClient } = require('../../server/controllers/user/stsClient');

// This test is currently skipped because it requires a valid ARN to run.
// describe the stsClient and the assumeRole function
xdescribe('stsClient', () => {
    xit('should assume a role', async () => {
        //declare a constant variable and set it to an object with the RoleArn and RoleSessionName properties
        const assumeRoleParams = {
            RoleArn: 'insert-actual-arn-for-test-here',
            RoleSessionName: 'test-session',
        };

        //declare a constant variable and set it to the result of the stsClient.assumeRole function promise call
        const { Credentials } = await stsClient.assumeRole(assumeRoleParams).promise();
        //expect the Credentials object to be defined
        expect(Credentials).toBeDefined();
        //expect the Credentials.AccessKeyId, Credentials.SecretAccessKey, Credentials.SessionToken, and Credentials.Expiration properties to be defined
        expect(Credentials.AccessKeyId).toBeDefined();
        expect(Credentials.SecretAccessKey).toBeDefined();
        expect(Credentials.SessionToken).toBeDefined();
        expect(Credentials.Expiration).toBeDefined();
    });
})