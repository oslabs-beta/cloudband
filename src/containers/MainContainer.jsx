import React, { useState } from 'react';
import EC2ChartContainer from './EC2ChartContainer.jsx';
import LambdaChartContainer from './LambdaChartContainer.jsx';
import Settings from '../components/Settings.jsx';
import '../containerStyling/MainContainer.scss';
import { Navigate } from 'react-router-dom';

//declare a constant MainContainer and pass in props as a parameter
const MainContainer = (props) => {
  //declare a constant loggedIn, arn, and region and set them equal to props.loggedIn, props.arn, and props.region
  const { loggedIn, arn, region } = props;
  //declare a constant [ec2Metric, setEc2Metric] and set it equal to useState and pass in 'cpu-credits' as an argument
  const [ec2Metric, setEc2Metric] = useState('cpu-credits');
  //declare a constant [tool, setTool] and set it equal to useState and pass in 'ec2' as an argument
  const [tool, setTool] = useState('ec2');
  //declare a constant [funcNames, setFuncNames] and set it equal to useState and pass in an empty array as an argument
  const [funcNames, setFuncNames] = useState([]);
  //declare a constant [currFunc, setCurrFunc] and set it equal to useState and pass in an empty string as an argument
  const [currFunc, setCurrFunc] = useState('');

  // renders ec2 or lambda charts/options based on drop down selection in settings
  function switchChartContainers() {
    //if tool is equal to 'ec2' then return the EC2ChartContainer component and pass in ec2Metric, arn, and region as props
    if (tool === 'ec2') {
      return (
        <EC2ChartContainer ec2Metric={ec2Metric} arn={arn} region={region} />
      );
      //otherwise, if the tool is equal to 'lambda' then return the LambdaChartContainer component and pass in currFunc, arn, and region as props
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
