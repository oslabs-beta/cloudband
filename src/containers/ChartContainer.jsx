import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CPUUtilizationChart from '../components/CPUUtilizationChart.jsx';
import NetworkInChart from '../components/NetworkInChart.jsx';
import NetworkOutChart from '../components/NetworkOutChart.jsx';
import CPUCreditUsageChart from '../components/CPUCreditUsageChart.jsx';
import CPUCreditBalanceChart from '../components/CPUCreditBalanceChart.jsx';
import CPUSurplusCreditBalanceChart from '../components/CPUSurplusCreditBalanceChart.jsx';
import '../containerStyling/ChartContainer.scss';

const ChartContainer = (props) => {
  const { ec2Metric, arn } = props;
  const [cpuUtilizationData, setCpuUtilizationData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });

  const [networkInData, setNetworkInData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });
  const [networkOutData, setNetworkOutData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });
  const [cpuCreditUsageData, setCpuCreditUsageData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });

  const [cpuCreditBalanceData, setCpuCreditBalanceData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });
  const [cpuSurplusCreditBalanceData, setCpuSurplusCreditBalanceData] =
    useState({
      values: [],
      timestamps: [],
      instanceIds: [],
    });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${ec2Metric}`, {
        params: {
          arn,
        },
      })
      .then((response) => {
        if (ec2Metric === 'cpu-utilization') {
          // const { CPUUtilization } = response.data;
          setCpuUtilizationData(response.data.CPUUtilization);
          console.log('response.data: ', response.data.CPUUtilization);
          console.log('cpuUtilizationData: ', cpuUtilizationData);
        } else if (ec2Metric === 'network-in-out') {
          console.log(response.data);
          setNetworkInData(response.data.NetworkIn);
          setNetworkOutData(response.data.NetworkOut);
        } else if (ec2Metric === 'cpu-credits') {
          setCpuCreditUsageData(response.data.CPUCreditUsage);
          // console.log(cpuCreditUsageData);
          setCpuCreditBalanceData(response.data.CPUCreditBalance);
          // console.log(cpuCreditBalanceData);
          setCpuSurplusCreditBalanceData(response.data.CPUSurplusCreditBalance);
          // console.log(cpuSurplusCreditBalanceData);
        }
      })
      // .then((response) => {
      //   console.log('response data --> ', response.data);
      // })
      .catch((err) => {
        console.log(err);
      });
  }, [ec2Metric]);

  function switchCharts() {
    if (ec2Metric === 'cpu-utilization') {
      return <CPUUtilizationChart chartData={cpuUtilizationData} />;
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

export default ChartContainer;
