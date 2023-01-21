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
  //   console.log('start time', StartTime);
  console.log('end time', EndTime);
  console.log('req.query in getLambdaMetrics: ', req.query);
  const { currFunc } = req.query;

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
    console.log('data', metricData);
    const metricByFuncData = metricData.MetricDataResults.map(
      (eachFuncMetric) => {
        let values = eachFuncMetric.Values;
        let timeStamps = eachFuncMetric.Timestamps;
        let metricName = eachFuncMetric.Label;
        console.log('metricName', metricName);
        return {
          metricName: metricName,
          values: values,
          timeStamps: timeStamps,
        };
      }
    );
    res.locals.lambdaMetrics = metricByFuncData;
    console.log('res.locals.lambdaMetrics', res.locals.lambdaMetrics);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getLambdaMetrics,
};
