const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

module.exports = {
  getInstances: async (req, res, next) => {
    const info = {
      region: 'us-east-1',
      // res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
      credentials: res.locals.credentials,
    };

    const ec2Client = new EC2Client(info);
    try {
      console.log('entered ec2 instances controller');
      //const { Reservations } = await ec2.describeInstances();
      //const Instances = Reservations.flatMap(reservation => reservation.Instances);

      const data = await ec2Client.send(new DescribeInstancesCommand({}));
      // console.log('ec2 instances data', data.Reservations[0].Instances); //array of objects with all instances
      // console.log('ec2 data', data); //array of objects with all instances
      const instances = data.Reservations;
      const instanceIds = instances.map((instance) => {
        return instance.Instances[0].InstanceId;
      });

      res.locals.ec2Instances = {
        instances: instanceIds,
      };
      console.log(res.locals.ec2Instances);
      return next();
    } catch (err) {
      console.log('error in describeInstances', err);
      return next(err);
    }
  },
};
