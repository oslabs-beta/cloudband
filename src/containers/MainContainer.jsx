import React, { useState } from 'react';
import InputToken from '../components/Signup.jsx';
// import Chart from '../components/LineChart.jsx';
// import PolarChart from '../components/PolarChart.jsx';
import EC2ChartContainer from './EC2ChartContainer.jsx';
import LambdaChartContainer from './LambdaChartContainer.jsx';
import SidebarContainer from '../containers/SidebarContainer.jsx';
import '../containerStyling/MainContainer.scss';

const MainContainer = () => {
  const [status, setStatus] = useState('start');
  const [ec2Metric, setEc2Metric] = useState('');
  const [arn, setArn] = useState();
  const [tool, setTool] = useState('ec2');
  const [funcNames, setFuncNames] = useState([]);
  const [currFunc, setCurrFunc] = useState('');

  function switchChartContainers() {
    if (tool === 'ec2') {
      return <EC2ChartContainer ec2Metric={ec2Metric} arn={arn} />;
    } else if (tool === 'lambda') {
      return (
        <div>
          <LambdaChartContainer currFunc={currFunc} arn={arn} />
        </div>
      );
    }
  }

  return (
    <div className="main-container-wrapper" id="cloud-intro">
      <SidebarContainer
        setStatus={setStatus}
        status={status}
        ec2Metric={ec2Metric}
        setEc2Metric={setEc2Metric}
        arn={arn}
        setArn={setArn}
        tool={tool}
        setTool={setTool}
        funcNames={funcNames}
        setFuncNames={setFuncNames}
        currFunc={currFunc}
        setCurrFunc={setCurrFunc}
      />
      {/* <ChartContainer
        chartData={chartData}
        ec2Metric={ec2Metric}
        arn={arn}
        tool={tool}
      /> */}
      <div>{switchChartContainers()}</div>
    </div>
  );
};

export default MainContainer;
