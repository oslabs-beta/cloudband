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
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 0.3 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 1}`,
      Label: 'CPUUtilization',
      MetricStat: {
        Metric: {
          Namespace: 'AWS/EC2',
          MetricName: 'CPUUtilization',
          Dimensions: [
            {
              Name: 'InstanceId',
              Value: instanceId,
            },
          ],
        },
        Period: 3600,
        Stat: 'Average',
      },
    }));

    const input = {
      StartTime,
      EndTime,
      LabelOptions: {
        Timezone: '-0400',
      },
      MetricDataQueries: queries,
    };
    const command = new GetMetricDataCommand(input);
    const responses = await cloudwatch.send(command);
    // console.log('responses: ', responses.MetricDataResults);
    const values = responses.MetricDataResults.reduce((acc, curr) => {
      acc.push(curr.Values);
      return acc;
    }, []);
    // console.log('values', values);
    const timestamps = responses.MetricDataResults[0].Timestamps;
    // console.log('timestamps: ', timestamps);

    const chartData = {
      values: values, // [[...], [...], [...]] as many arrays as there are instances
      timestamps: timestamps, // [...] 1 array
      instanceIds: instances, // ['string', 'string', 'string'] as many strings as there are instances
    };

    res.locals.chartData = chartData;
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getMetrics,
};
