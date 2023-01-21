import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../containerStyling/ChartContainer.scss';
import InvocationsChart from '../components/InvocationsChart.jsx';

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currFunc]);

  return (
    <div>
      <h2>Lambda Chart Container</h2>
      <InvocationsChart chartData={invocationData} />
      <InvocationsChart chartData={throttleData} />
      <InvocationsChart chartData={errorData} />
      <InvocationsChart chartData={durationData} />
    </div>
  );
};

export default LambdaChartContainer;
