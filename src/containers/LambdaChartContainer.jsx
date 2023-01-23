import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../containerStyling/ChartContainer.scss';
import InvocationsChart from '../components/InvocationsChart.jsx';
import ThrottlesChart from '../components/ThrottlesChart.jsx';
import ErrorsChart from '../components/ErrorsChart.jsx';
import DurationChart from '../components/DurationChart.jsx';
import LambdaLogs from '../components/LambdaLogs.jsx';
import '../containerStyling/LambdaChartContainer.scss';

const defaultDataStructure = {
  values: [],
  timestamps: [],
};

const LambdaChartContainer = (props) => {
  const { arn, currFunc, region } = props;
  const [invocationData, setInvocationData] = useState(defaultDataStructure);
  const [throttleData, setThrottleData] = useState(defaultDataStructure);
  const [errorData, setErrorData] = useState(defaultDataStructure);
  const [durationData, setDurationData] = useState(defaultDataStructure);
  const [lambdaLogs, setLambdaLogs] = useState([]);

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
        setInvocationData(response.data[0]);
        setThrottleData(response.data[1]);
        setErrorData(response.data[2]);
        setDurationData(response.data[3]);
        setLambdaLogs(response.data[4]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currFunc]);

  return (
    <div>
      <InvocationsChart chartData={invocationData} />
      <ThrottlesChart chartData={throttleData} />
      <ErrorsChart chartData={errorData} />
      <DurationChart chartData={durationData} />
      <LambdaLogs logs={lambdaLogs} />
    </div>
  );
};

export default LambdaChartContainer;
