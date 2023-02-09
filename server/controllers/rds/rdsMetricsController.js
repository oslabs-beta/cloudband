//require the AWS SDK for Node.js
const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//declare an rdsMetricsController object
const rdsMetricsController = {};

//getRDSCPUUtilizationMetrics function, which will be called by the getRDSCPUUtilizationMetrics route handler
rdsMetricsController.getRDSCPUUtilizationMetrics = async (req, res, next) => {
  const AWS = require('aws-sdk');
  //declare a constant variable called cloudwatch, which will be used to call the AWS CloudWatch API
  const cloudwatch = new AWS.CloudWatch({ region: req.query.region });

  //declare a constant variable called params, which will be used to pass the parameters of the RDSCpuUtilization metrics to the AWS CloudWatch API
  const params = {
    MetricName: 'CPUUtilization',
    Namespace: 'AWS/RDS',
    Period: 300,
    Dimensions: [
      {
        Name: 'DBInstanceIdentifier',
        Value: req.query.DBInstanceIdentifier,
      },
    ],
    StartTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    EndTime: new Date(),
    Statistics: ['Average'],
  };

//try to call the AWS CloudWatch API to get the RDSCpuUtilization metrics
  try {
    const data = await cloudwatch.getMetricData(params).promise();
    res.locals.getRDSCPUUtilizationMetrics = data;
    return next();
    //if there is an error, log the error and throw the error
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = rdsMetricsController;
