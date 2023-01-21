const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const getInvocationMetrics = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);
  const EndTime = new Date();
  const StartTime = new Date(EndTime.getTime() - 0.3 * 24 * 60 * 60 * 1000);
  //   console.log('start time', StartTime);
  //   console.log('end time', EndTime);
  const { funcs } = res.locals;

  const invocationQuery = funcs.map((funcName, index) => ({
    Id: `m${index + 1}_AllFuncs`,
    Label: `${funcName}`,
    MetricStat: {
      Metric: {
        Namespace: 'AWS/Lambda',
        MetricName: 'Invocations',
        Dimensions: [
          {
            Name: 'FunctionName',
            Value: `${funcName}`,
          },
        ],
      },
      Period: 60,
      Stat: 'Average',
    },
  }));

  const baseParams = {
    StartTime,
    EndTime,
    LabelOptions: {
      Timezone: '-0400',
    },
  };
  // console.log('baseParams', baseParams);

  const input = {
    ...baseParams,
    MetricDataQueries: invocationQuery,
  };

  try {
    const command = new GetMetricDataCommand(input);
    const metricData = await cloudwatch.send(command);
    console.log('data', metricData);
    const metricByFuncData = metricData.MetricDataResults.map(
      (eachFuncMetric) => {
        let values = eachFuncMetric.Values;
        let funcMetrics = eachFuncMetric.Timestamps;
        let funcName = eachFuncMetric.Label;
        // console.log('funcMetrics', funcMetrics);
        return {
          values: values,
          data: funcMetrics,
          funcNames: funcName,
        };
      }
    );
    res.locals.invocations = metricByFuncData;
    console.log('res.locals.invocations', res.locals.invocations);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getInvocationMetrics,
};