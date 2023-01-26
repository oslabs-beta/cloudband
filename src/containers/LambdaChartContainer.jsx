import React, { useEffect, useState } from 'react';
import InvocationsChart from '../components/InvocationsChart.jsx';
import ThrottlesChart from '../components/ThrottlesChart.jsx';
import ErrorsChart from '../components/ErrorsChart.jsx';
import DurationChart from '../components/DurationChart.jsx';
import LambdaLogs from '../components/LambdaLogs.jsx';
import { LambdaData } from '../Data.js';
import '../containerStyling/LambdaChartContainer.scss';

const LambdaChartContainer = (props) => {
  const { currFunc } = props;

  const [invocationData, setInvocationData] = useState(
    LambdaData.funcHttp2.invocationData
  );
  const [throttleData, setThrottleData] = useState(
    LambdaData.funcHttp2.throttleData
  );
  const [errorData, setErrorData] = useState(LambdaData.funcHttp2.errorData);
  const [durationData, setDurationData] = useState(
    LambdaData.funcHttp2.durationData
  );
  const [lambdaLogs, setLambdaLogs] = useState(LambdaData.funcHttp2.lambdaLogs);

  useEffect(() => {
    setInvocationData(LambdaData[currFunc].invocationData);
    setThrottleData(LambdaData[currFunc].throttleData);
    setErrorData(LambdaData[currFunc].errorData);
    setDurationData(LambdaData[currFunc].durationData);
    setLambdaLogs(LambdaData[currFunc].lambdaLogs);
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
