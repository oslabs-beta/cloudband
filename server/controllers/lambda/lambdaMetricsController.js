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
  const EndTime = new Date();
  const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

  // const { currFunc } = req.query;
  const { currFunc } = req.body; //testing artillery
  const { functionLogs } = res.locals;

  const params = {
    StartTime,
    EndTime,
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
          Stat: 'Average',
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
          Stat: 'Average',
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
          Stat: 'Average',
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
        let timeStamps = eachFuncMetric.Timestamps;
        let metricName = eachFuncMetric.Label;

        return {
          metricName: metricName,
          values: values,
          timeStamps: timeStamps,
        };
      }
    );
    res.locals.lambdaMetricsLogs = [...metricByFuncData, functionLogs];
    // console.log('res.locals.lambdaMetricsLogs', res.locals.lambdaMetricsLogs);

    res.locals.toBeCached = res.locals.lambdaMetricsLogs;
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getLambdaMetrics,
};
