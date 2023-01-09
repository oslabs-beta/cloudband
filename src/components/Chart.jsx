import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../componentStyling/Chart.scss';

//1. import the AWS SDK
//import AWS = require('aws-sdk');

//create a create authorization URL to generate a URL that will redirect the user to the AWS login page. This method will take as input the clientID, callbackURl, and scope of the OAuth 2.0 authorization request.

// const LineChart = () => {
//   const [chartData, setChartData] = useState({ timestamps: [], values: [] });

//   // Use the getMetrics function from the cloudwatchController module to fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:3000/test');
//       const data = await response.json();
//       setChartData(data);
//     };
//     fetchData();
//   }, []);
//   const labels = [...chartData.timestamps];
//   const values = [...chartData.values];

//   //create the chart data object
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'EC2 CPU Utilization',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: values,
//       },
//     ],
//   };

//   // Render the Line chart
//   return (
//     <div className="chart-wrapper">
//       <Line data={data} className="chart-content" />
//     </div>
//   );
// };

// export default LineChart;

const LineChart = () => {
  const [chartData, setChartData] = useState({ timestamps: []});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/test');
      const data = await response.json();
      setChartData(data);
    };
    fetchData();
  }, []);

  const labels = [...chartData.timestamps];

  const values = [0.3137948548514293, 0.31978228753788407, 0.32208697097193867];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: values,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} className="chart-content" />
    </div>
  );
};

export default LineChart;
