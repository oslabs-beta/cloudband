import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CPUUtilizationChart from '../components/CPUUtilizationChart.jsx';
import NetworkInChart from '../components/NetworkInChart.jsx';
import NetworkOutChart from '../components/NetworkOutChart.jsx';
import CPUCreditUsageChart from '../components/CPUCreditUsageChart.jsx';
import CPUCreditBalanceChart from '../components/CPUCreditBalanceChart.jsx';
import CPUSurplusCreditBalanceChart from '../components/CPUSurplusCreditBalanceChart.jsx';
import '../containerStyling/EC2ChartContainer.scss';

//declare a constant defaultDataStructure and set it equal to an object with the following properties: values, timestamps, and instanceIds
const defaultDataStructure = {
  values: [],
  timestamps: [],
  instanceIds: [],
};

//declare a constant EC2ChartContainer and set it equal to an arrow function that takes in props as a parameter
const EC2ChartContainer = (props) => {
  //declare a constant ec2Metric and set it equal to props.ec2Metric
  const { ec2Metric, arn, region } = props;
  //declare a constant [cpuUtilizationData, setCpuUtilizationData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [cpuUtilizationData, setCpuUtilizationData] =
    useState(defaultDataStructure);
  //declare a constant [networkInData, setNetworkInData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [networkInData, setNetworkInData] = useState(defaultDataStructure);
  //declare a constant [networkOutData, setNetworkOutData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [networkOutData, setNetworkOutData] = useState(defaultDataStructure);
  //declare a constant [cpuCreditUsageData, setCpuCreditUsageData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [cpuCreditUsageData, setCpuCreditUsageData] =
    useState(defaultDataStructure);
    //declare a constant [cpuCreditBalanceData, setCpuCreditBalanceData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [cpuCreditBalanceData, setCpuCreditBalanceData] =
    useState(defaultDataStructure);
    //declare a constant [cpuSurplusCreditBalanceData, setCpuSurplusCreditBalanceData] and set it equal to useState and pass in defaultDataStructure as an argument
  const [cpuSurplusCreditBalanceData, setCpuSurplusCreditBalanceData] =
    useState(defaultDataStructure);

  //declare a useEffect hook
  useEffect(() => {
    //declare a constant fetchCloudwatchData and set it equal to an async function
    const fetchCloudwatchData = async () => {
      //declare a try/catch block
      try {
        //declare a constant response and set it equal to await axios.get and pass in the following arguments: `http://localhost:3000/${ec2Metric}`, and an object with the following properties: params and set it equal to an object with the following properties: arn and region
        const response = await axios.get(`http://localhost:3000/${ec2Metric}`, {
          params: {
            arn,
            region,
          },
        });
        //if ec2Metric is equal to 'network-in-out'
        if (ec2Metric === 'network-in-out') {
          //set the state of networkInData to an object 
          setNetworkInData({
            //passing in all the properties of defaultDataStructure
            ...defaultDataStructure,
            //passing in all the properties of response.data.NetworkIn or an empty object
            ...(response?.data?.NetworkIn ?? {}),
          });
          //set the state of networkOutData to an object
          setNetworkOutData({
            //passing in all the properties of defaultDataStructure 
            ...defaultDataStructure,
            //passing in all the properties of response.data.NetworkOut or an empty object
            ...(response?.data?.NetworkOut ?? {}),
          });
        }
        //if the ec2Metric is equal to 'cpu-credits'
        if (ec2Metric === 'cpu-credits') {
          //set the state of cpuUtilizationData to an object
          setCpuUtilizationData({
            //passing in all the properties of defaultDataStructure
            ...defaultDataStructure, 
            //passing in all the properties of response.data.CPUUtilization or an empty object
            ...(response?.data?.CPUUtilization ?? {}),
          });
          //set the state of cpuCreditUsageData to an object
          setCpuCreditUsageData({
            //passing in all the properties of defaultDataStructure
            ...defaultDataStructure,
            //passing in all the properties of response.data.CPUCreditUsage or an empty object
            ...(response?.data?.CPUCreditUsage ?? {}),
          });
          //set the state of cpuCreditBalanceData to an object
          setCpuCreditBalanceData({
            //passing in all the properties of defaultDataStructure 
            ...defaultDataStructure,
            //passing in all the properties of response.data.CPUCreditBalance or an empty object
            ...(response?.data?.CPUCreditBalance ?? {}),
          });
          //set the state of cpuSurplusCreditBalanceData to an object
          setCpuSurplusCreditBalanceData({
            //passing in all the properties of defaultDataStructure
            ...defaultDataStructure,
            //passing in all the properties of response.data.CPUSurplusCreditBalance
            ...(response?.data?.CPUSurplusCreditBalance ?? {}),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    //invoke the fetchCloudwatchData function
    fetchCloudwatchData();
    //pass in ec2Metric as a dependency
  }, [ec2Metric]);

  // renders a different chart based on the ec2Metric a user selects in settings component
  function switchCharts() {
    //if ec2Metric is equal to 'network-in-out'
    if (ec2Metric === 'network-in-out') {
      //return the following JSX
      return (
        <div className="chart-container-wrapper">
          <div className="row">
            <NetworkInChart chartData={networkInData} />
            <NetworkOutChart chartData={networkOutData} />
          </div>
        </div>
      );
      //otherwise, if ec2Metric is equal to 'cpu-credits'
    } else if (ec2Metric === 'cpu-credits') {
      //return the following JSX
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
