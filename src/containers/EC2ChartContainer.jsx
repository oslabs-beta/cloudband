import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CPUUtilizationChart from '../components/CPUUtilizationChart.jsx';
import NetworkInChart from '../components/NetworkInChart.jsx';
import NetworkOutChart from '../components/NetworkOutChart.jsx';
import CPUCreditUsageChart from '../components/CPUCreditUsageChart.jsx';
import CPUCreditBalanceChart from '../components/CPUCreditBalanceChart.jsx';
import CPUSurplusCreditBalanceChart from '../components/CPUSurplusCreditBalanceChart.jsx';
import '../containerStyling/EC2ChartContainer.scss';

const defaultDataStructure = {
    values: [],
    timestamps: [],
    instanceIds: [],
};

const EC2ChartContainer = (props) => {
  const { ec2Metric, arn, region } = props;
  const [cpuUtilizationData, setCpuUtilizationData] =
    useState(defaultDataStructure);

  const [networkInData, setNetworkInData] = useState(defaultDataStructure);
  const [networkOutData, setNetworkOutData] = useState(defaultDataStructure);
  const [cpuCreditUsageData, setCpuCreditUsageData] =
    useState(defaultDataStructure);

  const [cpuCreditBalanceData, setCpuCreditBalanceData] =
    useState(defaultDataStructure);
  const [cpuSurplusCreditBalanceData, setCpuSurplusCreditBalanceData] =
    useState(defaultDataStructure);

  useEffect(() => {
    const fetchCloudwatchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${ec2Metric}`, {
        params: {
          arn,
          region,
        },
        });

        if (ec2Metric === 'network-in-out') {
          setNetworkInData({
            ...defaultDataStructure,
            ...(response?.data?.NetworkIn ?? {}),
          });
          setNetworkOutData({
            ...defaultDataStructure,
            ...(response?.data?.NetworkOut ?? {}),
          });
        }

        if (ec2Metric === 'cpu-credits') {
          setCpuUtilizationData({
            ...defaultDataStructure,
            ...(response?.data?.CPUUtilization ?? {}),
          });
          setCpuCreditUsageData({
            ...defaultDataStructure,
            ...(response?.data?.CPUCreditUsage ?? {}),
          });
          setCpuCreditBalanceData({
            ...defaultDataStructure,
            ...(response?.data?.CPUCreditBalance ?? {}),
          });
          setCpuSurplusCreditBalanceData({
            ...defaultDataStructure,
            ...(response?.data?.CPUSurplusCreditBalance ?? {}),
      });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCloudwatchData();
  }, [ec2Metric]);

  function switchCharts() {
    if (ec2Metric === 'cpu-utilization') {
      return (
        <div>
          <CPUUtilizationChart chartData={cpuUtilizationData} />
        </div>
      );
    } else if (ec2Metric === 'network-in-out') {
      return (
        <div>
          <NetworkInChart chartData={networkInData} />;
          <NetworkOutChart chartData={networkOutData} />;
        </div>
      );
    } else if (ec2Metric === 'cpu-credits') {
      return (
        <div>
          <CPUCreditUsageChart chartData={cpuCreditUsageData} />;
          <CPUCreditBalanceChart chartData={cpuCreditBalanceData} />;
          <CPUSurplusCreditBalanceChart
            chartData={cpuSurplusCreditBalanceData}
          />
          ;
        </div>
      );
    }
  }

  return <div className="chart-container-wrapper">{switchCharts()}</div>;
};

export default EC2ChartContainer;
