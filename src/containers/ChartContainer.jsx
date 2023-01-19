import React, { useState } from 'react';
import Chart from '../components/LineChart.jsx';
import PolarChart from '../components/PolarChart.jsx';
import '../containerStyling/ChartContainer.scss';

const ChartContainer = (props) => {
  return (
    <div className="chart-container-wrapper" id="cloud-intro">
      <Chart chartData={props.chartData} />
      <PolarChart chartData={props.chartData} />
    </div>
  );
};

export default ChartContainer;
