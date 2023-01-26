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


## Getting started (Contributor Guide)
🛠️ 

<p>1. Fork and clone this repository.</p>

<p>2. Follow the Developer Setup Guide.</p>

<p>3. Using the pre-made Dockerfile, build an image and tag it as "cloudband" (must use this name).</p>

<p>4. On Dockerhub, pull the mongo image.</p>

<p>5. Run both images via the docker-compose YAML file.</p>


## Monitoring Features:

1. On the landing page, users can select the type of EC2 resources they'd like to monitor. Once selected, users can view the metrics for the selected EC2 resources.

<p align="center">
<img src="insert-picture-of-landing-page-here" />
</p>

2. Users can then select different EC2 metric data types to render.

<p align="center">
<img src="image-of-dropdown-menu-options-here" />
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Authors:

Caroline Kimball - [Github](https://github.com/kimballcaroline) || [Linkedin](www.linkedin.com/in/kimballcaroline)

Camille Salter - [Github](https://github.com/CamSalter) || [Linkedin](www.linkedin.com/in/camille-salter)

Greg Jenner - [Github](https://github.com/gregjenner) || [Linkedin](www.linkedin.com/in/greg-o-jenner)

John Donovan - [Github](https://github.com/jodonovan845) || [Linkedin]()

Tomas Kim - [Github](https://github.com/tk0885) || [Linkedin](www.linkedin.com/in/tomasjskim)


Project Links: [Github](https://github.com/oslabs-beta/cloudband) || [Linkedin](https://www.linkedin.com/our-cloudband-project) || [Medium](https://medium.com/cloudbandwriteup)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contributing:

<p> Have a suggestion? Found a bug? Want to make Cloudband even more amazing?</p>
<p>Please submit issues/pull requests if you have feedback or message the Cloudband team to be added as a contributor: cloudbandEC37@gmail.com</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built with
   💻 

- [React](https://reactjs.org/)
- [ReactHooks](https://reactjs.org/docs/hooks-intro.html)
- [ReactRouter](https://reactrouter.com/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Chart.js](https://www.chartjs.org/)
- [Webpack](https://webpack.js.org/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
- [AWS IAM](https://aws.amazon.com/iam/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/)
- [AWS STS](https://aws.amazon.com/sts/)
- [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
- [Javascript](https://www.javascript.com/)
- [HTML](https://html.com/)
- [CSS](https://www.w3schools.com/css/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

This project is licensed under the OurProjectNotYourProject license - see the LICENSE.md file for details

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/cloudband.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/cloudband/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/cloudband.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/cloudband/stargazers
[license-shield]: https://img.shields.io/github/license/oslabs-beta/cloudband.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/cloudband/blob/master/LICENSE.txt


