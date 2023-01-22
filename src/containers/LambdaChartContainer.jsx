import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../containerStyling/ChartContainer.scss';
import InvocationsChart from '../components/InvocationsChart.jsx';
import ThrottlesChart from '../components/ThrottlesChart.jsx';
import ErrorsChart from '../components/ErrorsChart.jsx';
import DurationChart from '../components/DurationChart.jsx';
import LambdaLogs from '../components/LambdaLogs.jsx';

const LambdaChartContainer = (props) => {
  const { arn, currFunc } = props;
  const [invocationData, setInvocationData] = useState({
    values: [],
    timestamps: [],
  });
  const [throttleData, setThrottleData] = useState({
    values: [],
    timestamps: [],
  });
  const [errorData, setErrorData] = useState({
    values: [],
    timestamps: [],
  });
  const [durationData, setDurationData] = useState({
    values: [],
    timestamps: [],
  });
  const [lambdaLogs, setLambdaLogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getLambdaMetrics`, {
        params: {
          arn,
          currFunc,
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
