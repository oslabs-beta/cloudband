import React, { useState } from 'react';
import axios from 'axios';
import '../componentStyling/InputToken.scss';
//import AWS SDK
const AWS = require('aws-sdk');
//set the region
AWS.config.update({ region: 'REGION' });

const InputToken = (props) => {
  const { setChartData } = props;
  const [arn, setArn] = useState();
  //const [secretKey, setSecretKey] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(arn);
    // console.log(secretKey);
    axios
      .get('http://localhost:3000/metricsRequest', {
        params: {
          arn,
          // secretKey,
        },
      })
      .then((response) => {
        // console.log('request response: ', response);
        setChartData(response.data);
      });
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
        <label className="access-key-label">Enter ARN Here</label>
        <input
          type="password"
          placeholder="ARN"
          id="arn"
          onChange={(e) => {
            setArn(e.target.value);
            // console.log('access key: ', arn);;
          }}
        />
        {/* <label className="secret-access-key-label">
          Enter Secret Access Key
        </label>
        <input
          type="password"
          placeholder="secret access key"
          id="secretKey"
          onChange={(e) => {
            setSecretKey(e.target.value);
            // console.log('secret key: ', secretKey);;
          }}
        /> */}

        <button id="credentials-button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputToken;
