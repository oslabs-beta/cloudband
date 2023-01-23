import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../componentStyling/Signup.scss';
//import AWS SDK
const AWS = require('aws-sdk');
//set the region
AWS.config.update({ region: 'REGION' });

const Signup = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('us-east-1');

  const handleSubmit = (event) => {
    event.preventDefault();
    //create post req here to send info to server and build user in db ---> TO DO
    axios
      .post('/signup', {
        email: email,
        password: password,
        RoleARN: arn,
        region: region,
      })
      .then((response) => {
        setSignedUp(true);
      })
      .catch((err) => {
        console.log('error in sign up request: ', err);
      });
  };
  if (signedUp) {
    return <Navigate to="/login" />;
  }
  if (!signedUp) {
    return (
      <div className="signup-wrapper">
        <div className="row-1">
          <div className="instructions">
            <h2>Get Started!</h2>
            <h3>Sign up in just a few quick steps.</h3>
            <p>
              Follow this tutorial video on how to create a stack and generate
              the ARN. <br /> <br /> This will grant Cloudband access to AWS
              metrics. For more information on what data we capture, please
              refer to our&nbsp;
              <a href="#">privacy policy.</a>
            </p>
          </div>

          {/* <div style="position: relative; padding-bottom: 56.25%; height: 0;">
           */}
          <div id="video-wrapper">
            <iframe
              src="https://cloudband.s3.amazonaws.com/CloudFormation+-+Stack+creation.mp4"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              // allowfullscreen
            ></iframe>
            {/* <img
            src="https://cloudband.s3.amazonaws.com/ezgif.com-gif-maker.gif"
            alt="stack-creation-gif"
          /> */}
          </div>
        </div>

        <div className="row-2">
          <div className="column">
            <h3>Step 1:</h3>
            {/* "I acknowledge that AWS CloudFormation might create IAM resources." */}
            <div>
              <input type="checkbox" id="scales" name="scales" />
              <label for="scales">
                &nbsp; "I acknowledge that AWS CloudFormation might create IAM
                resources."
              </label>
            </div>
            <a
              href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=92a98196-9090-11ed-a1eb-0242ac120002&templateURL=https://cloudband.s3.amazonaws.com/cloudbandTemplate1.yml"
              target="_blank"
              className="create-stack-link"
              rel="noopener noreferrer"
            >
              <button className="secondary-btn">Create New Stack</button>
            </a>
          </div>
          <div className="column">
            <h3>Step 2:</h3>
            <p>
              Once stack creation has completed, head to the Output tab and copy
              the ARN and paste into the text box below
            </p>
            <label className="access-key-label">Enter ARN:</label>
            <input
              type="password"
              placeholder="ARN"
              id="arn"
              onChange={(e) => {
                setArn(e.target.value);
                console.log('arn: ', e.target.value);
              }}
            />
            <label className="region-label">Select Region:</label>
            <section className="dropdown-wrapper">
              <select
                name="region"
                id="region"
                onChange={(e) => {
                  setRegion(e.target.value);
                  console.log('region: ', e.target.value);
                }}
                value={region}
              >
                <option value="us-east-1">us-east-1</option>
                <option value="us-east-2">us-east-2</option>
                <option value="us-west-1">us-west-1</option>
                <option value="us-west-2">us-west-2</option>
                <option value="af-south-1">af-south-1</option>
                <option value="ap-east-1">ap-east-1</option>
                <option value="ap-south-2">ap-south-2</option>
                <option value="ap-southeast-3">ap-southeast-3</option>
                <option value="ap-south-1">ap-south-1</option>
                <option value="ap-northeast-3">ap-northeast-3</option>
                <option value="ap-northeast-2">ap-northeast-2</option>
                <option value="ap-southeast-1">ap-southeast-1</option>
                <option value="ap-southeast-2">ap-southeast-2</option>
                <option value="ap-northeast-1">ap-northeast-1</option>
                <option value="ca-central-1">ca-central-1</option>
                <option value="eu-central-1">eu-central-1</option>
                <option value="eu-west-1">eu-west-1</option>
                <option value="	eu-west-2"> eu-west-2</option>
                <option value="eu-south-1">eu-south-1</option>
                <option value="eu-west-3">eu-west-3</option>
                <option value="	eu-south-2"> eu-south-2</option>
                <option value="eu-north-1">eu-north-1</option>
                <option value="eu-central-2">eu-central-2</option>
                <option value="me-south-1">me-south-1</option>
                <option value="me-central-1">me-central-1</option>
                <option value="sa-east-1">sa-east-1</option>
                <option value="us-gov-east-1">us-gov-east-1</option>
                <option value="us-gov-west-1">us-gov-west-1</option>
              </select>
            </section>
            <a
              href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html"
              target="_blank"
              className="help-link"
            >
              Not sure which region to choose? Check all regions
            </a>
          </div>
          <div className="column">
            <h3>Step 3:</h3>
            <label className="email-label">Enter Email:</label>
            <input
              type="email"
              placeholder="EMAIL"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log('email: ', e.target.value);
              }}
            />
            <label className="password-label">Enter Password:</label>
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log('password: ', e.target.value);
              }}
            />
            <button
              className="primary-btn"
              id="credentials-button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Signup;
