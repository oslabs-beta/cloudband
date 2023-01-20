import React from 'react';
// import '../componentStyling/EC2Settings.scss';

const LambdaSettings = (props) => {
  const { functionNames, setFunctionNames } = props;

  // const onChange = (event) => {
  //   setEc2Metric(event.target.value);
  // };
  return (
    <div className="settings-wrapper">
      <h2>EC2 Settings</h2>
      <label htmlFor="ec2-metrics">
        Choose a function to view its metrics:
      </label>
      <section className="dropdown-wrapper">
        <select
          name="lambda-functions"
          id="lambda-functions"
          // onChange={onChange}
          value={functionNames}
        >
          <option value="cpu-credits">CPU Credits</option>
          <option value="cpu-utilization">CPU Utilization</option>
          <option value="network-in-out">Network In/Out</option>
        </select>
      </section>
    </div>
  );
};

export default LambdaSettings;
