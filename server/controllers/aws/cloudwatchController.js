//make a response object with a key for each metric type.
//john arn => arn:aws:iam::285264751894:role/CloudbandDelegationRole
//tomas arn => arn:aws:iam::499611886771:role/CloudbandDelegationRole
const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');
const { ListInstancesCommand } = require('@aws-sdk/client-ec2');
//const cloudwatch = new AWS.CloudWatch({apiVersion: '2010-08-01'});

const cloudwatchController = {};

cloudwatchController.getCPUUtilization = async (req, res, next) => {
  console.log('Entered cloudwatchController.getCPUUtilization');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.CPUUtilization = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getNetworkIn = async (req, res, next) => {
  console.log('Entered cloudwatchController.getNetworkIn');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 1}`,
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
        Period: 3600,
        Stat: 'Sum',
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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.NetworkIn = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getNetworkOut = async (req, res, next) => {
  console.log('Entered cloudwatchController.getNetworkOut');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 1}`,
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
        Period: 3600,
        Stat: 'Sum',
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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.NetworkOut = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUCreditUsage = async (req, res, next) => {
  console.log('Entered cloudwatchController.getCPUCreditUsage');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 1}`,
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
        Period: 3600,
        Stat: 'Sum',
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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.CPUCreditUsage = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUCreditBalance = async (req, res, next) => {
  console.log('Entered cloudwatchController.getCPUCreditBalance');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 1}`,
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
        Period: 3600,
        Stat: 'Sum',
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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.CPUCreditBalance = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUSurplusCreditBalance = async (req, res, next) => {
  console.log('Entered cloudwatchController.getCPUSurplusCreditBalance');
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances; //[id1, id2, id3]
    //extract instance identifers from the list of instances
    // console.log('instances', instances);

    const queries = instances.map((instanceId, index) => ({
      Id: `m${index + 7}`,
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
        Period: 3600,
        Stat: 'Sum',
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
    console.log('responses: ', responses.MetricDataResults[0].Values);
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

    res.locals.chartData.CPUSurplusCreditBalance = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//refactored way to get the same data, by splitting up the types of metrics and then the actual getMetrics call to cloudwatch. After discussion with Caroline we decided to keep the original way of getting the data, but I am keeping this code here for reference in case we find we want to refactor it for any reason going forward.

// const metrics = [
//   {
//     metricName: 'CPUUtilization',
//     stat: 'Average',
//     period: 3600
//   },
//   {
//     metricName: 'MemoryUtilization',
//     stat: 'Average',
//     period: 3600
//   },
//   {
//     metricName: 'NetworkIn',
//     stat: 'Sum',
//     period: 3600
//   },
//   {
//     metricName: 'NetworkOut',
//     stat: 'Sum',
//     period: 3600
//   },
//   {
//     metricName: 'CPUCredits',
//     stat: 'Sum',
//     period: 3600
//   }
// ]

// const getMetrics = async (req, res, next) => {
//   console.log('Entered cloudwatch controller');
//   const credentials = {
//     region: 'us-east-1',
//     credentials: res.locals.credentials,
//   };
//   const cloudwatch = new CloudWatchClient(credentials);

//   try {
//     const EndTime = new Date();
//     //shows the EC2 CPU utilization of the past 7 days -> currently 0.3 days
//     const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

//     const { instances } = res.locals.ec2Instances;
//     const queries = instances.map((instanceId, index) => {
//     const metricQueries = metrics.map((metric, idx) => {
//         return {
//           Id: `m${index * metrics.length + idx + 1}`,
//           Label: metric.metricName,
//           MetricStat: {
//             Metric: {
//               Namespace: 'AWS/EC2',
//               MetricName: metric.metricName,
//               Dimensions: [
//                 {
//                   Name: 'InstanceId',
//                   Value: instanceId,
//                 },
//               ],
//             },
//             Period: metric.period,
//             Stat: metric.stat,
//           },
//         }
//       })
//       return metricQueries;
//     });

//     const input = {
//       StartTime,
//       EndTime,
//       LabelOptions: {
//         Timezone: '-0400',
//       },
//       MetricDataQueries: [].concat(...queries),
//     };
//     const command = new GetMetricDataCommand(input);
//     const responses = await cloudwatch.send(command);
//     console.log('responses: ', responses);
//     res.json(responses);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

module.exports = {
  cloudwatchController,
  //getEC2MemoryMetrics
};
