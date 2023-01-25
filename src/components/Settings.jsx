import React, { useEffect } from 'react';
import axios from 'axios';
import '../componentStyling/Settings.scss';

const Settings = (props) => {
  const {
    ec2Metric,
    setEc2Metric,
    tool,
    setTool,
    funcNames,
    setFuncNames,
    arn,
    region,
    currFunc,
    setCurrFunc,
  } = props;

  const onEC2MetricChange = (event) => {
    setEc2Metric(event.target.value);
  };

  const onToolChange = (event) => {
    setTool(event.target.value);
  };

  const onCurrFuncChange = (event) => {
    setCurrFunc(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getLambdaNames`, {
        params: {
          arn,
          region,
        },
      })
      .then((response) => {
        console.log(
          'lambda names response from Settings component axios call: ',
          response
        );
        setFuncNames(response.data);
        setCurrFunc(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tool]);

  function switchSettings() {
    if (tool === 'ec2') {
      return (
        <div>
          <label htmlFor="ec2-metrics">Choose a set of metrics:</label>
          <section className="dropdown-wrapper">
            <select
              name="ec2-metrics"
              id="ec2-metrics"
              onChange={onEC2MetricChange}
              value={ec2Metric}
            >
              <option value="cpu-credits">CPU</option>
              <option value="network-in-out">Network In/Out</option>
            </select>
          </section>
          <h4>Tip:</h4>
          <p>
            Once your metrics have loaded, try clicking on the EC2 Instance Id's
            to add/remove the instance from your view.
          </p>
        </div>
      );
    } else if (tool === 'lambda') {
      const lambdaDropdownOptions = funcNames.map((funcName, index) => {
        return (
          <option value={funcName} key={index}>
            {funcName}
          </option>
        );
      });

      return (
        <div>
          <label htmlFor="curr-func">Choose a Lambda function:</label>
          <section className="dropdown-wrapper">
            <select
              name="curr-func"
              id="curr-func"
              onChange={onCurrFuncChange}
              value={currFunc}
            >
              {lambdaDropdownOptions}
            </select>
          </section>
        </div>
      );
    }
  }

  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      <p>
        Use the dropdowns below to choose which AWS tool and specific metrics
        you would like to view.
      </p>
      <label htmlFor="tool">Choose a View:</label>
      <section className="dropdown-wrapper">
        <select name="tool" id="tool" onChange={onToolChange} value={tool}>
          <option value="ec2">EC2</option>
          <option value="lambda">Lambda</option>
        </select>
      </section>
      <div>{switchSettings()}</div>
    </div>
  );
};

export default Settings;
