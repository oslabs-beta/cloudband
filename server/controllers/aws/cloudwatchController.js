//camille's cloudwatchController updates
const {
  CloudWatchClient,
  GetMetricDataCommand,
  EC2Client,
} = require('@aws-sdk/client-cloudwatch');
const { ListInstancesCommand } = require('@aws-sdk/client-ec2');


const getMetrics = async (accessKeyId, secretAccessKey, arn) => {
  const cloudwatch = new CloudWatchClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const ec2 = new EC2Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    const EndTime = new Date();
    //shows the EC2 CPU utilization of the past 7 days
    const StartTime = new Date(EndTime.getTime() - 7 * 24 * 60 * 60 * 1000);

    //retrieve a list of all EC2 instances
    const { Instances } = await ec2.send(new ListInstancesCommand());

    //extract instance identifers from the list of instances
    const instanceIds = Instances.map((instance) => instance.InstanceId);

    const input = {
      StartTime,
      EndTime,
      LabelOptions: {
        Timezone: '-0400',
      },
      MetricDataQueries: [
        {
          Id: 'm1',
          Label: 'CPUUtilization',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUUtilization',
            },
            Period: 300,
            Stat: 'Average',
            Dimensions: instanceIds.map((instanceId) => ({
              Name: 'InstanceId',
              Value: instanceId,
            })),
          },
        },
      ],
    };
    const command = new GetMetricDataCommand(input);
    const response = await cloudwatch.send(command);
    const metricDataResults = response.MetricDataResults;

    return metricDataResults.map((result) => ({
      instanceId: result.Label,
      cpuUtilization: result.Values.map((value) => value.Y),
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getMetrics,
};

// const {
//   CloudWatchClient,
//   GetMetricDataCommand,
// } = require('@aws-sdk/client-cloudwatch');
// const { AssumeRoleCommand, STSClient } = require('@aws-sdk/client-sts');
// const getCredentials = require('../user/getCredentials');

// import {
//   CloudWatchClient,
//   GetMetricDataCommand,
// } from '@aws-sdk/client-cloudwatch';
// import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';

// module.exports = {
//   getMetrics: async (req, res, next) => {
//     console.log('entered cloudwatchController getMetrics');
//     const info = {
//       region: 'us-east-1',
//       credentials: {
//         accessKeyId: req.accessKeyId, // change
//         secretAccessKey: req.secretAccessKey, // change
//       },
// 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
// john's arn:aws:iam::285264751894:role/CloudbandDelegationRole
// };

// const stsClient = new STSClient({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 's',
//     secretAccessKey: 's',
//   },
//   // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
// });
// const client = new CloudWatchClient(info);

// try {
// const EndTime = Math.round(new Date().getTime()); // now
// const EndTime = Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound
// const StartTime = EndTime - (604, 800 * 1000); //one week of milliseconds ago
//       const EndTime = new Date();
//       const StartTime = new Date('January 6, 2023 03:24:00');
//       const input = {
//         // StartTime: new Date(StartTime * 1000),
//         StartTime: StartTime,
//         EndTime: EndTime,
//         // EndTime: new Date(EndTime * 1000),
//         LabelOptions: {
//           Timezone: '-0400',
//         },
//         MetricDataQueries: [
//           {
//             Id: 'm1',
//             Label: 'CPUUtilization from 1 week ago til now',
//             MetricStat: {
//               Metric: {
//                 Namespace: 'AWS/EC2',
//                 MetricName: 'CPUUtilization',
//                 Dimensions: [
//                   {
//                     Name: 'InstanceId',
//                     Value: 'i-0c7b611ba1c3d1b27',
//                   },
//                 ],
//               },
//               Period: 300,
//               Stat: 'Average',
//             },
//           },
//         ],
//       };
//       const command = new GetMetricDataCommand(input);
//       const response = await client.send(command);
//       console.log('response', response.MetricDataResults[0].Values);
//       return next();
//     } catch (error) {
//       console.log('error fetching aws', error);
//       next(error);
//     }
//   },
// };

// // example with ec2 in namespace
// // {
// //   "StartTime": 1518867432,
// //   "EndTime": 1518868232,
// //   "LabelOptions": {
// //     "Timezone" : "-0400"
// //     },
// //   "MetricDataQueries": [
// //     {
// //       "Id": "m1",
// //       "Label": "CPUUtilization, peak of ${MAX} was at ${MAX_TIME}",
// //       "MetricStat": {
// //         "Metric": {
// //           "Namespace": "AWS/EC2",
// //           "MetricName": "CPUUtilization",
// //           "Dimensions": [
// //             {
// //               "Name": "InstanceId",
// //               "Value": "i-1234567890abcdef0"
// //             }
// //           ]
// //         },
// //         "Period": 300,
// //         "Stat": "Average"
// //       }
// //     },
// //     {
// //       "Id": "m2",
// //       "Label": "CPUUtilization, peak of ${MAX} was at ${MAX_TIME}",
// //       "MetricStat": {
// //         "Metric": {
// //           "Namespace": "AWS/EC2",
// //           "MetricName": "CPUUtilization",
// //           "Dimensions": [
// //             {
// //               "Name": "InstanceId",
// //               "Value": "i-111111111111111111"
// //             }
// //           ]
// //         },
// //         "Period": 300,
// //         "Stat": "Average"
// //       }
// //     },
// //     {
// //       "Id": "m3",
// //       "MetricStat": {
// //         "Metric": {
// //           "Namespace": "AWS/ELB",
// //           "MetricName": "HealthyHostCount",
// //           "Dimensions": [
// //             {
// //               "Name": "LoadBalancerName",
// //               "Value": "my-lb-B"
// //             }
// //           ]
// //         },
// //         "Period": 300,
// //         "Stat": "Sum",
// //         "Unit": "None"
// //       }
// //     }
// //   ]
// // }

// module.exports = {
//   getMetrics: async (req, res, next) => {
//     console.log('entered cloudwatchController getMetrics');

//     // Call the getCredentials function to set the credentials in the request object
//     await getCredentials(req, res, next, 'arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME', 'sessionName');

//     // Create an STS client using the retrieved access key ID, secret access key, and session token
//     const stsClient = new STSClient({
//       region: 'us-east-1',
//       credentials: {
//         accessKeyId: req.accessKeyId,
//         secretAccessKey: req.secretAccessKey,
//         sessionToken: req.sessionToken,
//       },
//     });

//     try {
//       // Call the assumeRole method to get temporary AWS credentials
//       const { Credentials } = await stsClient.send(new AssumeRoleCommand({
//         RoleArn: 'arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME',
//         RoleSessionName: 'sessionName',
//       }));

//       console.log(`Temporary credentials:`, Credentials);

//       // Use the temporary AWS credentials to get metrics from CloudWatch
//       const client = new CloudWatchClient({
//         region: 'us-east-1',
//         credentials: Credentials,
//       });

//       // Extract the necessary parameters for getting metrics from CloudWatch from the request body
//       const { namespace, metricName, startTime, endTime, period } = req.body;

//       // Get the metrics from CloudWatch
//       const data = await client.getMetricData({
//         MetricDataQueries: [
//           {
//             Id: 'metric1',
//             MetricStat: {
//               Metric: {
//                 Namespace: namespace,
//                 MetricName: metricName,
//               },
//               Period: period,
//               Stat: 'Average',
//             },
//           },
//         ],
//         StartTime: startTime,
//         EndTime: endTime,
//       }).promise();

//       console.log(data);

//       // Send the metrics data back in the response
//       res.send(data);
//     } catch (error) {
//       console.log('error fetching aws', error);
//       next(error);
//     }
//   },
// };

module.exports = cloudwatchController;
