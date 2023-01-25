const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const networkMetricsController = {};

networkMetricsController.getNetworkMetrics = async (req, res, next) => {
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

    // console.log('queries', queries);
    const command = new GetMetricDataCommand(input);
    const responses = await cloudwatch.send(command);
    // console.log('responses', responses);
    const values = responses.MetricDataResults.reduce((acc, curr) => {
      acc.push(curr.Values);
      return acc;
    }, []);

    const timestamps = responses.MetricDataResults[0].Timestamps;

    const chartData = {
      values: values,
      timestamps: timestamps,
      instanceIds: instances,
    };
    // console.log('chartData', chartData);
    res.locals.chartData = { CPUUtilization: chartData };
    // console.log('res.locals.chartData', res.locals.chartData);
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

module.exports = networkMetricsController;
