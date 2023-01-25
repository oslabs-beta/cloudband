const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const networkMetricsController = {};

// Get network metrics for all instances in a region
networkMetricsController.getNetworkMetrics = async (req, res, next) => {
  const { instances } = res.locals.ec2Instances;

  const credentials = {
    region: req.query.region,
    credentials: res.locals.credentials,
  };

  // Create a new instance of the CloudWatchClient with the user's region and credentials
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    //initiate starttime to be 7 days before endtime
    const EndTime = new Date();
    const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);

    const queries = [];

    //generate AWS EC2 network metrics queries for each instance
    instances.forEach((instanceId, index) => {
      const id = index * instances.length + index + 1;
      queries.push(
        {
          Id: `m${id}`,
          Label: 'NetworkIn',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'NetworkIn',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 3600 * 8,
            Stat: 'Sum',
          },
        },
        {
          Id: `m${id + 1}`,
          Label: 'NetworkOut',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'NetworkOut',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 3600 * 8,
            Stat: 'Sum',
          },
        }
      );
    });

    const input = {
      StartTime,
      EndTime,
      LabelOptions: {
        Timezone: '-0400',
      },
      MetricDataQueries: queries,
    };

    //send AWS query to CloudWatch
    const command = new GetMetricDataCommand(input);
    const responses = await cloudwatch.send(command);

    //format data to be sent to frontend
    const timestamps = responses.MetricDataResults[0].Timestamps;
    const data = responses.MetricDataResults.reduce((acc, curr) => {
      if (!acc[curr.Label]) {
        acc[curr.Label] = {
          values: [],
          timestamps: timestamps,
          instanceIds: instances,
        };
      }
      acc[curr.Label].values.push(curr.Values);
      return acc;
    }, {});

    res.locals.chartData = data;

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = networkMetricsController;
