const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const cpuMetricsController = {};

// Get CPU metrics for all instances in a region
cpuMetricsController.getCPUMetrics = async (req, res, next) => {
  const { instances } = res.locals.ec2Instances;

  const credentials = {
    region: req.query.region,
    credentials: res.locals.credentials,
  };

  // Initiate StartTime to be 7 days before EndTime
  const EndTime = new Date();
  const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Create new instance of CloudWatchClient with user's region and credentials
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const queries = [];

    // Generate AWS EC2 CPU metrics queries for each instance
    instances.forEach((instanceId, index) => {
      const id = index * instances.length + index + 1;
      queries.push(
        {
          Id: `m${id}`,
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
            Period: 3600 * 8,
            Stat: 'Average',
          },
        },
        {
          Id: `m${id + 1}`,
          Label: 'CPUCreditUsage',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUCreditUsage',
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
          Id: `m${id + 2}`,
          Label: 'CPUCreditBalance',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUCreditBalance',
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
          Id: `m${id + 3}`,
          Label: 'CPUSurplusCreditBalance',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUSurplusCreditBalance',
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

    // Send GetMetricDataCommand to AWS CloudWatch
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

module.exports = cpuMetricsController;
