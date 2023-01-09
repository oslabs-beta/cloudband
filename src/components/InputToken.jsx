// import React, { useState } from 'react';
// import '../componentStyling/InputToken.scss';

// const InputToken = () => {
//   const [accessKeyId, setAccessKeyId] = useState();
//   const [secretAccessKey, setSecretAccessKey] = useState();
//   const [sessionToken, setSessionToken] = useState();

//   const handleChange = (event, setState) => {
//     setState(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Send the user-provided credentials to the server via an HTTP request
//     fetch('/api/add-credentials', {
//       method: 'POST',
//       body: JSON.stringify({
//         accessKeyId,
//         secretAccessKey,
//         sessionToken,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div className="input-token-wrapper">
//       <h2>Step 1: Add AWS Credentials</h2>
//       <form action="" className="token-input-form">
//         <label className="access-key-id-label">Enter Access Key ID</label>
//         <input
//           type="text"
//           placeholder="access key ID"
//           id="accessKeyId"
//           onChange={() => {
//             handleChange(event, setAccessKeyId);
//           }}
//         />
//         <label className="secret-access-key-label">
//           Enter Secret Access Key
//         </label>
//         <input
//           type="text"
//           placeholder="secret access key"
//           id="secretAccessKey"
//           onChange={() => {
//             handleChange(event, setSecretAccessKey);
//           }}
//         />
//         <label className="session-token-label">Enter Session Token</label>
//         <input
//           type="text"
//           placeholder="session token"
//           id="sessionToken"
//           onChange={() => {
//             handleChange(event, setSessionToken);
//           }}
//         />
//         <button id="credentials-button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };


import React, { useState } from 'react';
import '../componentStyling/InputToken.scss';
//import AWS SDK
const AWS = require('aws-sdk');
//set the region
AWS.config.update({region: 'REGION'});

//create a new SSO service object
//const sso = new AWS.SSO({apiVersion: '2019-06-10'});

const InputToken = () => {
  const [accessKey, setAccessKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [stackName, setStackName] = useState();
  const [templateLocation, setTemplateLocation] = useState();

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(accessKey);
    console.log(secretKey);
    console.log(stackName);
    console.log(templateLocation);
    const accessKey = event.target.elements.accessKey.value;
    const secretKey = event.target.elements.secret-access.key.value;
    const stackName = event.target.elements.stackName.value;
    const templateLocation = event.target.elements.templateLocation.value;
  };

  return (
    <div className="input-token-wrapper">
      <h2>Step 1: Create a Stack</h2>
      <form action="" className="token-input-form">
        {/* <label htmlFor="token" className="token-input-label">Enter Token Here:</label>
          <input type="text" placeholder="token" id="token-input"/> */}
        <span>
          Click here to go to the Stack Creation Wizard in your AWS Account:
        </span>
        <a
          href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=cloudband-permission&param_ExternalId=61ae90dc-8d15-11ed-a1eb-0242ac120002&templateURL=https://cloudbandtemplate.s3.amazonaws.com/cloudformation.yml"
          target="blank"
        >
          <img
            src="https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png"
            alt="Launch stack wizard link"
          />
        </a>
        <label className="access-key-label">Enter Access Key</label>
        <input
          type="text"
          placeholder="access key"
          id="accessKey"
          onChange={() => {
            handleChange(event, setAccessKey);
          }}
        />
        <label className="secret-access-key-label">
          Enter Secret Access Key
        </label>
        <input
          type="text"
          placeholder="secret access key"
          id="secretKey"
          onChange={() => {
            handleChange(event, setSecretKey);
          }}
        />
        <label className="stack-name-label">Enter Stack Name</label>
        <input
          type="text"
          placeholder="stack name"
          id="stackName"
          onChange={() => {
            handleChange(event, setStackName);
          }}
        />
        <label className="template-location-label">
          Enter Template Location
        </label>
        <input
          type="text"
          placeholder="template-location"
          id="templateLocation"
          onChange={() => {
            handleChange(event, setTemplateLocation);
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
