import React, { useState } from 'react';
import InputToken from '../components/InputToken.jsx';
// import Chart from '../components/LineChart.jsx';
// import PolarChart from '../components/PolarChart.jsx';
import ChartContainer from './ChartContainer.jsx';
import SidebarContainer from '../containers/SidebarContainer.jsx';
import '../containerStyling/MainContainer.scss';

const MainContainer = () => {
  const [chartData, setChartData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });
  const [status, setStatus] = useState('start');

  return (
    <div className="main-container-wrapper" id="cloud-intro">
      <SidebarContainer
        setChartData={setChartData}
        setStatus={setStatus}
        status={status}
      />
      <ChartContainer chartData={chartData} />
    </div>
  );
};

export default MainContainer;
