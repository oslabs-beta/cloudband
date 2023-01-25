const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

const cloudwatchController = {};

cloudwatchController.getCPUUtilization = async (req, res, next) => {
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
        Period: 3600 * 8,
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

    res.locals.chartData = { CPUUtilization: chartData };

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getNetworkIn = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances;

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
        Period: 3600 * 8,
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

    res.locals.chartData = { NetworkIn: chartData };

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getNetworkOut = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();

    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances;

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
        Period: 3600 * 8,
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

    res.locals.chartData.NetworkOut = chartData;

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUCreditUsage = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();

    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances;

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
        Period: 3600 * 8,
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

    res.locals.chartData.CPUCreditUsage = chartData;

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUCreditBalance = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();
    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances;

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

    res.locals.chartData.CPUCreditBalance = chartData;

    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

cloudwatchController.getCPUSurplusCreditBalance = async (req, res, next) => {
  const credentials = {
    region: 'us-east-1',
    credentials: res.locals.credentials,
  };
  const cloudwatch = new CloudWatchClient(credentials);

  try {
    const EndTime = new Date();

    const StartTime = new Date(EndTime.getTime() - 1 * 24 * 60 * 60 * 1000);

    const { instances } = res.locals.ec2Instances;

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

    const values = responses.MetricDataResults.reduce((acc, curr) => {
      acc.push(curr.Values);
      return acc;
    }, []);

    const timestamps = responses.MetricDataResults[0].Timestamps;

    const chartData = {
      values: values, // [[...], [...], [...]] as many arrays as there are instances
      timestamps: timestamps,
      instanceIds: instances,
    };

    res.locals.chartData.CPUSurplusCreditBalance = chartData;
    // console.log('res.locals.chartData: ', res.locals.chartData);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = cloudwatchController;
