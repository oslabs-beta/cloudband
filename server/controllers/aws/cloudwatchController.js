// Description: This file contains the controller for the AWS CloudWatch API
import {
  CloudWatchClient,
  //   GetMetricStatisticsCommand,  
  GetMetricDataCommand,
  //   GetMetricDataCommandInput,
} from '@aws-sdk/client-cloudwatch';

import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';

module.exports = {
  getMetrics: async (req, res, next) => {
    const { accessKey, secretKey, stackName, templateLocation } = req.body;

    const assumeRoleCommand = new AssumeRoleCommand({
      RoleArn: 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
      RoleSessionName: 'CloudbandDelegationRoleSession',
    });


    // const info = {
    //   region: 'us-east-1',
    //   credentials: accessKeyId: ,
    //   secretAccessKey:
    //   // 'arn:aws:iam::499611886771:role/CloudbandDelegationRole',
    // };

    const stsClient = new STSClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const assumeRoleResponse = await stsClient.send(assumeRoleCommand);
    const {
      Credentials: { AccessKeyId, SecretAccessKey, SessionToken },
    } = assumeRoleResponse;
    
    const cloudWatchClient = new CloudWatchClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: SessionToken,
      },
    })

    const getMetricDataCommand = new GetMetricDataCommand({
      //add your CloudWatch API request parameters here
    });

    const metricData = await cloudWatchClient.send(getMetricDataCommand);

    //add logic to handle the response from the CloudWatch API and send a response back to the client
  },
};



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
              Period: 300,
              Stat: 'Average',
            },
          },
        ],
      };
      const command = new GetMetricDataCommand(input);
      const response = await client.send(command);
      console.log('response', response.MetricDataResults[0].Values);
      return next();
    } catch (error) {
      console.log('error fetching aws', error);
      next(error);
    }
  

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
