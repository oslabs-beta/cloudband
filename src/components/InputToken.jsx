import React, { useState } from 'react';
import axios from 'axios';
import '../componentStyling/InputToken.scss';
//import AWS SDK
const AWS = require('aws-sdk');
//set the region
AWS.config.update({ region: 'REGION' });

const InputToken = (props) => {
  const { setStatus, setArn, setEc2Metric } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('authorized');
  };

  return (
    <div className="input-token-wrapper">
      <h2>Connect to Your Account</h2>
      <h3>Step 1:</h3>
      <form action="" className="token-input-form">
        <a
          href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=92a98196-9090-11ed-a1eb-0242ac120002&templateURL=https://cloudband.s3.amazonaws.com/cloudbandTemplate1.yml"
          target="_blank"
          className="create-stack-link"
          rel="noopener noreferrer"
        >
          {'Create New Stack'}
        </a>
        <h3>Step 2:</h3>
        <label className="access-key-label">Enter ARN Here</label>
        <input
          type="password"
          placeholder="ARN"
          id="arn"
          onChange={(e) => {
            setArn(e.target.value);
          }}
        />
        <button id="credentials-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputToken;
