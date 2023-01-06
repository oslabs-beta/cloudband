import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';

module.exports = {
  getMetrics: async (req, res, next) => {
    // const info = {
    //   region: 'us-east-1',
    //   credentials: accessKeyId: ,
    //   secretAccessKey:
    //   // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    // };

    const stsClient = new STSClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 's',
        secretAccessKey: 's',
      },
      // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    });
    const client = new CloudWatchClient(info);

    try {
      const EndTime = Math.round(new Date().getTime()); // now
      const StartTime = EndTime - (604, 800 * 1000); //one week of milliseconds ago
      const input = {
        StartTime: StartTime,
        EndTime: EndTime,
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
                    Value: 'i-0edf34786b633e3cf',
                  },
                ],
              },
              Period: 300,
              Stat: 'Average',
            },
          },
        ],
      };
      const response = await client.send(new GetMetricDataCommand(input));
    } catch (error) {
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
