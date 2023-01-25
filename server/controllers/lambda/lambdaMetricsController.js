const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const getLambdaMetrics = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };

  const cloudwatch = new CloudWatchClient(credentials);
  // const EndTime = new Date();
  const EndTime = Math.round(new Date().getTime() / 1000 / 60 / 5) * 60 * 5;
  // const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);
  const StartTime = EndTime - 30 * 60 * 24 * 7;

  const { currFunc } = req.query;
  const { functionLogs } = res.locals;
  // console.log('functionLogs: ', functionLogs);

  const params = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    MetricDataQueries: [
      {
        Id: 'm1',
        Label: 'Invocations',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Invocations',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: currFunc,
              },
            ],
          },
          Period: 60,
          Stat: 'Sum',
        },
      },
      {
        Id: 'm2',
        Label: 'Throttles',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Throttles',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: currFunc,
              },
            ],
          },
          Period: 60,
          Stat: 'Sum',
        },
      },
      {
        Id: 'm3',
        Label: 'Errors',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Errors',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: currFunc,
              },
            ],
          },
          Period: 60,
          Stat: 'Sum',
        },
      },
      {
        Id: 'm4',
        Label: 'Duration',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Duration',
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: currFunc,
              },
            ],
          },
          Period: 60,
          Stat: 'Average',
        },
      },
    ],
  };

  try {
    const command = new GetMetricDataCommand(params);
    const metricData = await cloudwatch.send(command);

    const metricByFuncData = metricData.MetricDataResults.map(
      (eachFuncMetric) => {
        let values = eachFuncMetric.Values;
        let timestamps = eachFuncMetric.Timestamps;
        let metricName = eachFuncMetric.Label;

        return {
          metricName: metricName,
          values: values,
          timestamps: timestamps,
        };
      }
    );

    res.locals.lambdaMetricsLogs = [...metricByFuncData, functionLogs];
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getLambdaMetrics,
};
