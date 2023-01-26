<!--
*** This ReadMe used the template from https://github.com/othneildrew/Best-README-Template as an inspiration
-->

<a name='readme-top'></a>

<div align='center'>
<img src="https://cloudband.s3.amazonaws.com/tk0885_geometric_minimal_cloud_Logo_line_simple_4cc0c0da-cbd9-4d57-b6c8-d892979e2c27.png" height ="300px" width="300px" align="center">
  </a>
<h1>Cloudband</h1>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

</div>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#about-cloudband">About</a></li> 
      <li><a href="#getting-started-user-guide">Getting Started</a></li> 
      <li><a href="#monitoring-features">Monitoring Features</a></li>    
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#built-with">Built With</a></li>
      <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>  
    <li><a href="#acknowledgments">Authors</a></li> 
  </ol>
</details>


## About Cloudband
<p>
Easy access and straightforward, intuitive visualization of AWS resource metrics are critical to AWS developers. It is intimidating to navigate the extensive AWS documentation and many hundreds of services, and challenging to quickly visualize metrics for these resources.</p>

<p>Our solution is a web application that provides comprehensive charts for direct visualization of a wide range of available EC2 metrics and Lambda functions, for those who use Lambda functions to process lifecycle events from Amazon Elastic Compute Cloud and their related EC2 resources</p>

Project Links: [Github](https://github.com/oslabs-beta/cloudband) | [Linkedin](https://www.linkedin.com/company/cloudbandec37) | [Press](will write this later this week)


## Getting started (User Guide)
🛠️ 

Visit our [Website](https://www.cloud-band.io)

1. Existing user? You can log in using your email and password.

2. For new users, click "Create New Stack.

3. Follow the link and sign in as an IAM user. Follow the instructions on the How To page or watch our How To Create a New Stack Video Tutorial.

4. Copy and paste the unique ARN outputted from the prior step.

5. Input the ARN into the Enter ARN Here field

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting started (Contributor Guide)
🛠️ 

1. Fork and clone this repository.

2. Follow the [Developer Setup Guide](https://github.com/oslabs-beta/cloudband/blob/dev/README-DeveloperGuide.md).

3. Using the pre-made Dockerfile, build an image and tag it as "cloudband" (must use this name).

4. On Dockerhub, pull the mongo image.

5. Create an .env file with the following information, replacing the AWS_ACCESS_KEY and AWS_SECRET_KEY for your cloudband-user account's keys.

```

# cloudband's keys
AWS_ACCESS_KEY=********************
AWS_SECRET_KEY=******************************************

#MONGO URI
MONGO_URI_=mongodb://mongodb:27017/cloudband

export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY
export AWS_DEFAULT_REGION=us-east-1
export MONGO_URI=$MONGO_URI_

```


5. Run both images via the docker-compose YAML file.

6. Go to your localhost:3000 to see the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Monitoring Features:

1. On the landing page, users can select the type of EC2 resources they'd like to monitor. Once selected, users can view the metrics for the selected EC2 resources.


<img src="https://cloudband.s3.amazonaws.com/Cloudband_toggleEC2Metrics.gif" width='800px' align='center'/>


2. By clicking on the instance id, you can easily toggle an instance's data on or off to view only what you want to see.


<img src="https://cloudband.s3.amazonaws.com/Cloudband_toggleEC2instances_cropped.gif" width='800px' align='center'/>


3. The Cloudband interface allows you to seamlessly switch between your EC2 and Lambda metrics for a more convenient way to view your data.


<img src="https://cloudband.s3.amazonaws.com/Cloudband-toggle-lambda-functions.gif" width='800px' align='center'/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contributing:

Have a suggestion? Found a bug? Want to make Cloudband even more amazing? Please fork the repo and create a pull request.
Don't forget to give the project a star ⭐️! Thanks again!

1. Fork Cloudband
2. Clone to your local machine
   ```
   git clone <your-repo-url>
   ```
3. Create your Feature Branch
   ```
   git checkout -b feature/AmazingFeature
   ```

4. Commit your Changes
   ```
   git commit -m 'Add some AmazingFeature'
   ```
5. Push to the Branch
   ```
   git push origin feature/AmazingFeature
   ```
10. Open a Pull Request


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built with
   💻 

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/)
- [Jest](https://jestjs.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Authors:

Caroline Kimball - [Github](https://github.com/kimballcaroline) || [Linkedin](www.linkedin.com/in/kimballcaroline)

Camille Salter - [Github](https://github.com/CamSalter) || [Linkedin](www.linkedin.com/in/camille-salter)

Greg Jenner - [Github](https://github.com/gregjenner) || [Linkedin](www.linkedin.com/in/greg-o-jenner)

John Donovan - [Github](https://github.com/jodonovan845) || [Linkedin]()

Tomas Kim - [Github](https://github.com/tk0885) || [Linkedin](www.linkedin.com/in/tomasjskim)


Project Links: [Github](https://github.com/oslabs-beta/cloudband) || [Linkedin](https://www.linkedin.com/our-cloudband-project) || [Medium](https://medium.com/cloudbandwriteup)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgments

* [ReactHooks](https://reactjs.org/docs/hooks-intro.html)
* [ReactRouter](https://reactrouter.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Webpack](https://webpack.js.org/)
* [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
* [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
* [AWS IAM](https://aws.amazon.com/iam/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS EC2](https://aws.amazon.com/ec2/)
* [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/)
* [AWS STS](https://aws.amazon.com/sts/)
* [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
* [Javascript](https://www.javascript.com/)
* [HTML](https://html.com/)
* [CSS](https://www.w3schools.com/css/)
* [Babel](https://babeljs.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/cloudband.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/cloudband/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/cloudband.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/cloudband/stargazers
[license-shield]: https://img.shields.io/github/license/oslabs-beta/cloudband.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/cloudband/blob/master/LICENSE.txt


