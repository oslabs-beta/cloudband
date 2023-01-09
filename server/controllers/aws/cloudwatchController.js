const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');
const { AssumeRoleCommand, STSClient } = require('@aws-sdk/client-sts');

// import {
//   CloudWatchClient,
//   GetMetricDataCommand,
// } from '@aws-sdk/client-cloudwatch';
// import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';

module.exports = {
  getMetrics: async (req, res, next) => {
    console.log('entered cloudwatchController getMetrics');
    const info = {
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'AKIAUE2Y2VULDWWSMOFO',
        secretAccessKey: '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',
      },
      // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
      // john's arn:aws:iam::285264751894:role/CloudbandDelegationRole
    };

    // const stsClient = new STSClient({
    //   region: 'us-east-1',
    //   credentials: {
    //     accessKeyId: 's',
    //     secretAccessKey: 's',
    //   },
    //   // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    // });
    const client = new CloudWatchClient(info);

    try {
      // const EndTime = Math.round(new Date().getTime()); // now
      // const EndTime = Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound
      // const StartTime = EndTime - (604, 800 * 1000); //one week of milliseconds ago
      const EndTime = new Date();
      const StartTime = new Date('January 6, 2023 03:24:00');
      const input = {
        // StartTime: new Date(StartTime * 1000),
        StartTime: StartTime,
        EndTime: EndTime,
        // EndTime: new Date(EndTime * 1000),
        LabelOptions: {
          Timezone: '-0400',
        },
        MetricDataQueries: [
          {
            Id: 'm1',
            Label: 'CPUUtilization from 1 week ago til now',
            MetricStat: {
              Metric: {
                Namespace: 'AWS/EC2',
                MetricName: 'CPUUtilization',
                Dimensions: [
                  {
                    Name: 'InstanceId',
                    Value: 'i-0c7b611ba1c3d1b27',
                  },
                ],
              },
              Period: 3600,
              Stat: 'Average',
            },
          },
        ],
      };
      const command = new GetMetricDataCommand(input);
      const response = await client.send(command);
      console.log('values', response.MetricDataResults[0].Values);
      console.log('timestamp', response.MetricDataResults[0].Timestamps);
      console.log('response', response);

      res.locals.data = {
        values: response.MetricDataResults[0].Values,
        timestamps: response.MetricDataResults[0].Timestamps,
      };
      return next();
    } catch (error) {
      console.log('error fetching aws', error);
      next(error);
    }
  },
};

// example with ec2 in namespace
// {
//   "StartTime": 1518867432,
//   "EndTime": 1518868232,
//   "LabelOptions": {
//     "Timezone" : "-0400"
//     },
//   "MetricDataQueries": [
//     {
//       "Id": "m1",
//       "Label": "CPUUtilization, peak of ${MAX} was at ${MAX_TIME}",
//       "MetricStat": {
//         "Metric": {
//           "Namespace": "AWS/EC2",
//           "MetricName": "CPUUtilization",
//           "Dimensions": [
//             {
//               "Name": "InstanceId",
//               "Value": "i-1234567890abcdef0"
//             }
//           ]
//         },
//         "Period": 300,
//         "Stat": "Average"
//       }
//     },
//     {
//       "Id": "m2",
//       "Label": "CPUUtilization, peak of ${MAX} was at ${MAX_TIME}",
//       "MetricStat": {
//         "Metric": {
//           "Namespace": "AWS/EC2",
//           "MetricName": "CPUUtilization",
//           "Dimensions": [
//             {
//               "Name": "InstanceId",
//               "Value": "i-111111111111111111"
//             }
//           ]
//         },
//         "Period": 300,
//         "Stat": "Average"
//       }
//     },
//     {
//       "Id": "m3",
//       "MetricStat": {
//         "Metric": {
//           "Namespace": "AWS/ELB",
//           "MetricName": "HealthyHostCount",
//           "Dimensions": [
//             {
//               "Name": "LoadBalancerName",
//               "Value": "my-lb-B"
//             }
//           ]
//         },
//         "Period": 300,
//         "Stat": "Sum",
//         "Unit": "None"
//       }
//     }
//   ]
// }
