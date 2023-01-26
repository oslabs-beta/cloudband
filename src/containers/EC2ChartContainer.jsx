import React from 'react';
import CPUUtilizationChart from '../components/CPUUtilizationChart.jsx';
import NetworkInChart from '../components/NetworkInChart.jsx';
import NetworkOutChart from '../components/NetworkOutChart.jsx';
import CPUCreditUsageChart from '../components/CPUCreditUsageChart.jsx';
import CPUCreditBalanceChart from '../components/CPUCreditBalanceChart.jsx';
import CPUSurplusCreditBalanceChart from '../components/CPUSurplusCreditBalanceChart.jsx';
import { EC2Data } from '../Data.js';
import '../containerStyling/EC2ChartContainer.scss';

// object the state of each metric is initialized as
const EC2ChartContainer = (props) => {
  const { ec2Metric } = props;
  // state to hold ec2 metric data
  const cpuUtilizationData = EC2Data.CPUUtilization;
  const networkInData = EC2Data.NetworkIn;
  const networkOutData = EC2Data.NetworkOut;
  const cpuCreditUsageData = EC2Data.CPUCreditUsage;
  const cpuCreditBalanceData = EC2Data.CPUCreditBalance;
  const cpuSurplusCreditBalanceData = EC2Data.CPUSurplusCreditBalance;

  // renders a different chart based on the ec2Metric a user selects in settings component
  function switchCharts() {
    if (ec2Metric === 'network-in-out') {
      return (
        <div className="chart-container-wrapper">
          <div className="row">
            <NetworkInChart chartData={networkInData} />
            <NetworkOutChart chartData={networkOutData} />
          </div>
        </div>
      );
    } else if (ec2Metric === 'cpu-credits') {
      return (
        <div className="chart-container-wrapper">
          <div className="row">
            <CPUUtilizationChart chartData={cpuUtilizationData} />
            <CPUCreditUsageChart chartData={cpuCreditUsageData} />
          </div>
          <div className="row">
            <CPUCreditBalanceChart chartData={cpuCreditBalanceData} />
            <CPUSurplusCreditBalanceChart
              chartData={cpuSurplusCreditBalanceData}
            />
          </div>
        </div>
      );
    }
  }

  return <div>{switchCharts()}</div>;
};

export default EC2ChartContainer;
