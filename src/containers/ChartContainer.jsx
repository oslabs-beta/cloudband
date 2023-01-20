import React, { useState } from 'react';
import CPUUtilizationChart from '../components/CPUUtilizationChart.jsx';
import NetworkInChart from '../components/NetworkInChart.jsx';
import NetworkOutChart from '../components/NetworkOutChart.jsx';
import CPUCreditUsageChart from '../components/CPUCreditUsageChart.jsx';
import CPUCreditBalanceChart from '../components/CPUCreditBalanceChart.jsx';
import CPUSurplusCreditBalanceChart from '../components/CPUSurplusCreditBalanceChart.jsx';
import '../containerStyling/ChartContainer.scss';

const ChartContainer = (props) => {
  const { ec2Metric, chartData } = props;

  // fetch
  //   ec2Metric => network-in-out -> run two queries and return

  function switchCharts() {
    if (ec2Metric === 'cpu-utilization') {
      return <CPUUtilizationChart chartData={chartData} />;
    } else if (ec2Metric === 'network-in-out') {
      return (
        <div>
          <NetworkInChart chartData={chartData} />;
          <NetworkOutChart chartData={chartData} />;
        </div>
      );
    } else if (ec2Metric === 'cpu-credits') {
      return (
        <div>
          <CPUCreditUsageChart chartData={chartData} />;
          <CPUCreditBalanceChart chartData={chartData} />;
          <CPUSurplusCreditBalanceChart chartData={chartData} />;
        </div>
      );
    }
  }

  return <div className="chart-container-wrapper">{switchCharts()}</div>;
};

export default ChartContainer;
