//camille's cloudwatchController updates
const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');
const { ListInstancesCommand } = require('@aws-sdk/client-ec2');

const getMetrics = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAUE2Y2VULDWWSMOFO', //UPDATE THIS FROM FRONT END
      secretAccessKey: '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', //UPDATE THIS FROM FRONT END
    },
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days
    const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m-${index}`,
      Label: 'CPUUtilization',
      MetricStat: {
        Metric: {
          Namespace: 'AWS/EC2',
          MetricName: 'CPUUtilization',
          Dimensions: {
            Name: 'InstanceId',
            Value: `${instanceId}`,
          },
        },
        Period: 300,
        Stat: 'Average',
      },
    }));

    const input = {
      StartTime,
      EndTime,
      LabelOptions: {
        Timezone: '-0400',
      },
      MetricDataQueries: `${queries}`,
    };
    const command = new GetMetricDataCommand(input);
    const response = await cloudwatch.send(command);

    console.log('response', response.MetricDataResults);

    // console.log('responseData', response.MetricDataResults[0].Values);
    // console.log('responseData', response.MetricDataResults[0].Timestamps);

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getMetrics,
};
