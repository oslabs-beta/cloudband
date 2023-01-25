const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const cpuMetricsController = {};

cpuMetricsController.getCPUMetrics = async (req, res, next) => {
  const { region } = req.query;
  const { instances } = res.locals.ec2Instances;

  const credentials = {
    region: region,
    credentials: res.locals.credentials,
  };

  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);
    const queries = [];

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

    const command = new GetMetricDataCommand(input);
    const responses = await cloudwatch.send(command);
    const chartData = responses.MetricDataResults.reduce((acc, curr) => {
      if (!acc[curr.Label]) {
        acc[curr.Label] = {
          values: [],
          timestamps: [],
          instanceIds: instances,
        };
      }
      acc[curr.Label].values = curr.Values;
      acc[curr.Label].timestamps = curr.Timestamps;
      return acc;
    }, {});

    // console.log('chartData', chartData);
    res.locals.chartData = chartData;
    console.log('res.locals.chartData', res.locals.chartData);
    // res.locals.chartData.CPUCreditUsage = chartData;
    // res.locals.chartData.CPUCreditBalance = chartData;
    // res.locals.chartData.CPUSurplusCreditBalance = chartData;

    /*
    chartData = {
        CPUUtilization: {values: [], timestamps: [], instanceIds: []},
        CPUCreditUsage: {values: [], timestamps: [], instanceIds: []},
        CPUCreditBalance: {values: [], timestamps: [], instanceIds: []},
        CPUSurplusCreditBalance: {values: [], timestamps: [], instanceIds: []},
    };
    */

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = cpuMetricsController;
