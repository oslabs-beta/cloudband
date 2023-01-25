const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//retrieve metrics for each lambda function
const getLambdaMetrics = async (req, res, next) => {
  const credentials = {
    region: req.query.region,
    credentials: res.locals.credentials,
  };

  //create new instance of CloudWatchClient with user's region and credentials
  const cloudwatch = new CloudWatchClient(credentials);

  //initiate endtime to be current time rounded to nearest 5 minutes
  const EndTime = Math.round(new Date().getTime() / 1000 / 60 / 5) * 60 * 5;
  //initiate starttime to be 7 days before endtime
  const StartTime = EndTime - 60 * 60 * 24 * 7;

  const { currFunc } = req.query;
  const { functionLogs } = res.locals;

  //AWS query format for each individual lambda function to list metrics
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

  //send formatted query to AWS CloudWatch and format response to be used in frontend
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
