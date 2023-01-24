import React, { useState } from 'react';
import EC2ChartContainer from './EC2ChartContainer.jsx';
import LambdaChartContainer from './LambdaChartContainer.jsx';
import Settings from '../components/Settings.jsx';
import '../containerStyling/MainContainer.scss';
import { Navigate } from 'react-router-dom';

const MainContainer = (props) => {
  const { loggedIn, arn, region } = props;

  const [ec2Metric, setEc2Metric] = useState('cpu-credits');
  const [tool, setTool] = useState('ec2');
  const [funcNames, setFuncNames] = useState([]);
  const [currFunc, setCurrFunc] = useState('');

  // renders ec2 or lambda charts/options based on drop down selection in settings
  function switchChartContainers() {
    if (tool === 'ec2') {
      return (
        <EC2ChartContainer ec2Metric={ec2Metric} arn={arn} region={region} />
      );
    } else if (tool === 'lambda') {
      return (
        <div>
          <LambdaChartContainer currFunc={currFunc} arn={arn} region={region} />
        </div>
      );
    }
  }

  // reroutes to login page if a user is not logged in
  if (!loggedIn) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="main-container-wrapper" id="cloud-intro">
        <Settings
          ec2Metric={ec2Metric}
          setEc2Metric={setEc2Metric}
          arn={arn}
          region={region}
          tool={tool}
          setTool={setTool}
          funcNames={funcNames}
          setFuncNames={setFuncNames}
          currFunc={currFunc}
          setCurrFunc={setCurrFunc}
        />
        <div>{switchChartContainers()}</div>
      </div>
    );
  }
};

export default MainContainer;
