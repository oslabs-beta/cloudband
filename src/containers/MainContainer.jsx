import React, { useState } from 'react';
import EC2ChartContainer from './EC2ChartContainer.jsx';
import LambdaChartContainer from './LambdaChartContainer.jsx';
import Settings from '../components/Settings.jsx';
import { LambdaFuncNames } from '../Data.js';
import '../containerStyling/MainContainer.scss';
// import { Navigate } from 'react-router-dom';

const MainContainer = (props) => {
  const [ec2Metric, setEc2Metric] = useState('cpu-credits');
  const [tool, setTool] = useState('ec2');
  const [currFunc, setCurrFunc] = useState('funcHttp2');

  const funcNames = LambdaFuncNames;
  // renders ec2 or lambda charts/options based on drop down selection in settings
  function switchChartContainers() {
    if (tool === 'ec2') {
      return <EC2ChartContainer ec2Metric={ec2Metric} />;
    } else if (tool === 'lambda') {
      return (
        <div>
          <LambdaChartContainer currFunc={currFunc} />
        </div>
      );
    }
  }

  return (
    <div className="main-container-wrapper" id="cloud-intro">
      <Settings
        ec2Metric={ec2Metric}
        setEc2Metric={setEc2Metric}
        tool={tool}
        setTool={setTool}
        funcNames={funcNames}
        currFunc={currFunc}
        setCurrFunc={setCurrFunc}
      />
      <div>{switchChartContainers()}</div>
    </div>
  );
};

export default MainContainer;
