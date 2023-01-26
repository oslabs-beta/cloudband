<!--
*** This ReadMe used the template from https://github.com/othneildrew/Best-README-Template as an inspiration
-->

<a name='readme-top'></a>

<div align='center'>
<img src="https://cloudband.s3.amazonaws.com/tk0885_geometric_minimal_cloud_Logo_line_simple_4cc0c0da-cbd9-4d57-b6c8-d892979e2c27.png" height ="300px" width="300px" align="center">
  </a>
<h1>Cloudband - Developer's Guide</h1>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#about-cloudband">About</a></li> 
      <li><a href="#getting-started">Getting Started</a></li>      
      <li><a href="#monitoring-features">Monitoring Features</a></li>
        <li><a href="#authors">Authors</a></li>      
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#license">License</a></li>         
  </ol>
</details>


## About Cloudband
<p>An active AWS account is required in order to make full use of Cloudband’s features.  It is highly suggested to make a new AWS account specifically for Cloudband if your use case is anything more than demoing the application.</p>

## IAM Setup

<p>In order for the Cloudband application to pull a user’s metrics, we will need to create an IAM user to programmatically access that user’s AWS.</p>

<p>On your AWS account, do the following:</p>

<p>1. Create an IAM user called cloudband-user with programmatic access (no need for this user to be able to sign in to the AWS console)</p>

<p>2. Attach the following policies directly to cloudband-user:</p>

<ul>
  <li>AdministratorAccess</li>
  <li>AmazonEC2FullAccess</li>
  <li>AmazonS3FullAccessAWS</li>
  <li>AWSLambda_FullAccess</li>
  <li>AWSLambdaRole</li>
  <li>AWSSecurityHubFullAccess</li>
  <li>CloudWatchFullAccess</li>
  <li>CloudWatchLogsFullAccess</li>
</ul>

<p>3. Create an access key for cloudband-user.  Keep the access key and secret access key in your records - this will be used in the .env file in the Cloudband application.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Streamlining the User Sign-Up Experience
<p>If a user wants to allow cloudband-user to pull metrics from their account, they must create a role on their account.  This role will specify that cloudband-user can access their account as well as specifying exactly what cloudband-user can do once they have gained access.  An AWS Service called CloudFormation will be used to automate the creation of this role on a user’s account and streamline the user sign-up experience.</p>


## Template Creation and Storage
<p>In order to allow the use of CloudFormation to automate the creation of a role, we must first provide the instruction of what that role can do.  This comes in the form of a template.  Create a yaml file (extension is .yml) with the following content (<b>replacing the Principal / AWS ARN with the cloudband-user’s ARN & replacing the sts:External Id with the external ID that you generate via https://www.uuidgenerator.net/)</b>:</p>

<details>
  
```
Description: 'CloudFormation stack'
Resources:
 CloudbandDelegationRole:
   Type: 'AWS::IAM::Role'
   Properties:
     AssumeRolePolicyDocument:
       Version: 2012-10-17
       Statement:
         - Effect: Allow
           Principal:
             AWS:
               - arn:aws:iam::635533801215:user/cloudband-user
           Action:
             - 'sts:AssumeRole'
           Condition:
             StringEquals:
               'sts:ExternalId': 92a98196-9090-11ed-a1eb-0242ac120002
     Path: /
     RoleName: CloudbandDelegationRole
     Policies:
       - PolicyName: Resources
         PolicyDocument:
           Version: 2012-10-17
           Statement:
             - Effect: Allow
               Action: 'apigateway:GET'
               Resource: '*'
             - Effect: Allow
               Action: 'apigateway:HEAD'
               Resource: '*'
             - Effect: Allow
               Action: 'apigateway:OPTIONS'
               Resource: '*'
             - Effect: Allow
               Action: 'appsync:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'appsync:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'athena:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'athena:batchGet*'
               Resource: '*'
             - Effect: Allow
               Action: 'athena:getNamedQuery'
               Resource: '*'
             - Effect: Allow
               Action: 'athena:getQueryExecution'
               Resource: '*'
             - Effect: Allow
               Action: 'athena:getQueryExecution'
               Resource: '*'
             - Effect: Allow
               Action: 'autoscaling:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'batch:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudformation:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudformation:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudformation:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudfront:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudfront:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudwatch:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'cloudwatch:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'dax:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'dax:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'discovery:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'discovery:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'dynamodb:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'dynamodb:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'ec2:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'ecs:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'ecs:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'ecr:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'ecr:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'ecr:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'eks:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'eks:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'elasticache:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'elasticache:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'elasticloadbalancing:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'es:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'es:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'events:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'events:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'firehose:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'firehose:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:getDataRetrievalPolicy'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:getVaultAccessPolicy'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:getVaultLock'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:getVaultNotifications'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:listTagsForVault'
               Resource: '*'
             - Effect: Allow
               Action: 'glacier:listVaults'
               Resource: '*'
             - Effect: Allow
               Action: 'iot:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'iot:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'iot:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'kinesis:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'kinesis:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'kinesisanalytics:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'kinesisanalytics:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'lambda:listFunctions'
               Resource: '*'
             - Effect: Allow
               Action: 'lambda:listTags'
               Resource: '*'
             - Effect: Allow
               Action: 'rds:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'rds:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'route53:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'route53:get*'
               Resource: '*'
             - Effect: Allow
               Action: 's3:getBucket*'
               Resource: '*'
             - Effect: Allow
               Action: 's3:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'sdb:domainMetadata'
               Resource: '*'
             - Effect: Allow
               Action: 'sdb:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'sdb:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'sns:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'sns:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'sqs:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'sqs:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'states:describe*'
               Resource: '*'
             - Effect: Allow
               Action: 'states:get*'
               Resource: '*'
             - Effect: Allow
               Action: 'states:list*'
               Resource: '*'
             - Effect: Allow
               Action: 'tag:get*'
               Resource: '*'
       - PolicyName: Logs
         PolicyDocument:
           Version: 2012-10-17
           Statement:
             - Effect: Allow
               Action: 'logs:deleteSubscriptionFilter'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:describeLogStreams'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:describeSubscriptionFilters'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:filterLogEvents'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:putSubscriptionFilter'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:startQuery'
               Resource: '*'
             - Effect: Allow
               Action: 'logs:stopQuery'
               Resource: '*'
       - PolicyName: Metrics
         PolicyDocument:
           Version: 2012-10-17
           Statement:
             - Effect: Allow
               Action: 'cloudwatch:get*'
               Resource: '*'
       - PolicyName: Traces
         PolicyDocument:
           Version: 2012-10-17
           Statement:
             - Effect: Allow
               Action: 'xray:batch*'
               Resource: '*'
             - Effect: Allow
               Action: 'xray:get*'
               Resource: '*'

Parameters:
 ExternalId:
   Description: 'The external ID for the Cloudband delegation role'
   Type: String

Outputs:
 Version:
   Description: Cloudband CF template version
   Value: 2020-02-06
 CloudbandDelegationRoleArn:
   Description: 'The ARN for the Cloudband delegation role'
   Value: !GetAtt
     - CloudbandDelegationRole
     - Arn
```
  
</details>


## Template Storage in an S3 Bucket

<p>The template must be stored on our AWS account.  The simplest way to do this is to create an S3 bucket and upload the template yaml file with the following steps:</p>

<ol>
  <li>Navigate to the AWS Service called S3.</li>
  <li>Select Create Bucket.</li>
  <li>Name the bucket "cloudband".</li>
  <li>Unselect "Block all public access".</li>
  <li>Create bucket.</li>
  <li>Add to bucket policy the text below step 8.</li>    
  <li>Click upload and upload your created yaml file template.</li>
  <li>In the list of objects in your S3 bucket, check off the Cloudband Template and click Copy URL.</li>
 </ol>
 
```

{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cloudband/*"
        }
    ]
}

```


## Stack Creation Link:

<p>Use the following link to allow your user to automatically create a stack.  This link can be attached to the “Create New Stack” button found in the codebase (in InputToken.jsx - line 42). Add in your template URL, region, and external id into the link to ensure the stack is properly configured.</p>

```

https://console.aws.amazon.com/cloudformation/home?region=<YOUR-REGION>#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=<YOUR-EXTERNALID>&templateURL=<YOUR-TEMPLATE-S3-URL>

```


## Finish Setup:

Continue following the main [README](https://github.com/oslabs-beta/cloudband/blob/dev/README.md).
