import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvocationsChart from '../components/InvocationsChart.jsx';
import ThrottlesChart from '../components/ThrottlesChart.jsx';
import ErrorsChart from '../components/ErrorsChart.jsx';
import DurationChart from '../components/DurationChart.jsx';
import LambdaLogs from '../components/LambdaLogs.jsx';
import '../containerStyling/LambdaChartContainer.scss';

//declare a constant defaultDataStructure and set it equal to an object with the following properties: values and timestamps
const defaultDataStructure = {
  values: [],
  timestamps: [],
};

//declare a constant LambdaChartContainer and set it equal to an arrow function that takes in props as a parameter
const LambdaChartContainer = (props) => {
  //declare a constant {arn, currFunc, region} and set it equal to props
  const { arn, currFunc, region } = props;
  //declare a constant [invocationData, setInvocationData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [invocationData, setInvocationData] = useState(defaultDataStructure);
  //declare a constant [throttleData, setThrottleData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [throttleData, setThrottleData] = useState(defaultDataStructure);
  //declare a constant [errorData, setErrorData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [errorData, setErrorData] = useState(defaultDataStructure);
  //declare a constant [durationData, setDurationData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [durationData, setDurationData] = useState(defaultDataStructure);
  //declare a constant [lambdaLogs, setLambdaLogs] and set it equal to useState and pass in an empty array as an argument
  const [lambdaLogs, setLambdaLogs] = useState([]);

  //use the useEffect hook to make an axios request to the getLambdaMetrics endpoint
  useEffect(() => {
    axios
      .get(`http://localhost:3000/getLambdaMetrics`, {
        params: {
          arn,
          currFunc,
          region,
        },
      })
      .then((response) => {
        console.log(
          'response from LambdaChartContainer getLambdaMetrics: ',
          response
        );
        //set the state of invocationData, throttleData, errorData, durationData, and lambdaLogs to the data returned from the axios request
        setInvocationData({
          ...defaultDataStructure,
          ...(response?.data[0] ?? {}),
        });
        setThrottleData({
          ...defaultDataStructure,
          ...(response?.data[1] ?? {}),
        });
        setErrorData({ ...defaultDataStructure, ...(response?.data[2] ?? {}) });
        setDurationData({
          ...defaultDataStructure,
          ...(response?.data[3] ?? {}),
        });
        setLambdaLogs(response?.data[4] ?? []);
      })
      .then(() => {
        console.log('durationData: ', durationData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currFunc]);

  return (
    <div className="lambda-chart-container">
      <InvocationsChart chartData={invocationData} />
      <ThrottlesChart chartData={throttleData} />
      <ErrorsChart chartData={errorData} />
      <DurationChart chartData={durationData} />
      <LambdaLogs logs={lambdaLogs} />
    </div>
  );
};

export default LambdaChartContainer;
