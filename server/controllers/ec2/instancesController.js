const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

//retrieve ids from all ec2 instances in a region
module.exports = {
  getInstances: async (req, res, next) => {
    const info = {
      region: req.query.region,
      credentials: res.locals.credentials,
    };

    //create new instance of EC2Client with user's region and credentials
    const ec2Client = new EC2Client(info);

    try {
      const data = await ec2Client.send(new DescribeInstancesCommand({}));

      //extract instance ids from data
      const instances = data.Reservations;
      const instanceIds = instances.map((instance) => {
        return instance.Instances[0].InstanceId;
      });

      res.locals.ec2Instances = {
        instances: instanceIds,
      };
      return next();
    } catch (err) {
      console.log('error in describeInstances', err);
      return next(err);
    }
  },
};
