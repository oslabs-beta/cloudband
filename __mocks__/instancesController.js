const { EC2Client, DescribeInstancesCommand } = jest.genMockFromModule('@aws-sdk/client-ec2');

module.exports = {
  getInstances: jest.fn().mockImplementation(async (req, res, next) => {
    const info = {
      region: 'us-east-1',
      credentials: res.locals.credentials,
    };

    const ec2Client = new EC2Client(info);
    try {
      const data = await ec2Client.send(DescribeInstancesCommand({}));
      const instances = data.Reservations;
      const instanceIds = instances.map((instance) => {
        return instance.Instances[0].InstanceId;
      });

      res.locals.ec2Instances = {
        instances: instanceIds,
      };
      return next();
    } catch (err) {
      return next(err);
    }
  }),
};
