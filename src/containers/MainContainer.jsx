import React, { useState } from 'react';
import InputToken from '../components/InputToken.jsx';
import Chart from '../components/LineChart.jsx';
import PolarChart from '../components/PolarChart.jsx';
import '../containerStyling/MainContainer.scss';

const MainContainer = () => {
  const [chartData, setChartData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });

  return (
    <div className="main-container-wrapper" id="cloud-intro">
      <InputToken setChartData={setChartData} />
      <Chart chartData={chartData} />
      <PolarChart chartData={chartData} setChartData={setChartData} />
    </div>
  );
};

export default MainContainer;
