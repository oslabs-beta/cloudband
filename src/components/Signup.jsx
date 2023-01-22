import React, { useState } from 'react';
import axios from 'axios';
import '../componentStyling/Signup.scss';
//import AWS SDK
const AWS = require('aws-sdk');
//set the region
AWS.config.update({ region: 'REGION' });

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    //create post req here to send info to server and build user in db ---> TO DO
  };

  return (
    <div className="signup-wrapper">
      <div className="row-1">
        <div className="instructions">
          <h2>Get Started!</h2>
          <h3>Sign up in just a few quick steps.</h3>
          <p>
            Follow this tutorial video on how to create a stack and generate the
            ARN. <br /> <br /> This will grant Cloudband access to AWS metrics.
            For more information on what data we capture, please refer to
            our&nbsp;
            <a href="#">privacy policy.</a>
          </p>
        </div>

        {/* <div style="position: relative; padding-bottom: 56.25%; height: 0;">
         */}
        <div id="video-wrapper">
          <iframe
            src="https://www.loom.com/embed/05c81bb14b964b73994bb41ae64e5043"
            // frameborder="0"
            // webkitallowfullscreen="true"
            // mozallowfullscreen
            // allowfullscreen
            // style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          ></iframe>
        </div>
      </div>

      <div className="row-2">
        <div className="column">
          <h3>Step 1:</h3>
          <p>
            "I acknowledge that AWS CloudFormation might create IAM resources."
          </p>
          <a
            href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=92a98196-9090-11ed-a1eb-0242ac120002&templateURL=https://cloudband.s3.amazonaws.com/cloudbandTemplate1.yml"
            target="_blank"
            className="create-stack-link"
            rel="noopener noreferrer"
          >
            {'Create New Stack'}
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
              // setArn(e.target.value);
              console.log('arn: ', e.target.value);
            }}
          />
        </div>
        <div className="column">
          <h3>Step 3:</h3>
          <label className="username-label">Enter Username:</label>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={(e) => {
              // setUsername(e.target.value);
              console.log('username: ', e.target.value);
            }}
          />
          <label className="password-label">Enter Password:</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={(e) => {
              // setPassword(e.target.value);
              console.log('password: ', e.target.value);
            }}
          />
          <button id="credentials-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
