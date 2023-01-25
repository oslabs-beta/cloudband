import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Options from './LineChartOptions.js';
import '../componentStyling/EC2ChartStyling.scss';

const NetworkOutChart = (props) => {
  const { chartData } = props;

  const labels = chartData.timestamps
    .map((timestamp) => {
      const date = new Date(timestamp);
      // const month = date.getMonth() + 1;
      // const day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      return `${hour}:${minute}`;
    })
    .reverse(); //[timestamps]

  const CHART_COLORS = {
    0: 'rgb(255, 99, 132)',
    1: 'rgb(255, 159, 64)',
    2: 'rgb(255, 205, 86)',
    3: 'rgb(75, 192, 192)',
    4: 'rgb(54, 162, 235)',
    5: 'rgb(153, 102, 255)',
    6: 'rgb(201, 203, 207)',
  };

  const datasets = chartData.values
    .map((array, index) => {
      return {
        label: chartData.instanceIds[index],
        data: array,
        borderColor: CHART_COLORS[index],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: `y`,
      };
    })
    .reverse();

  const data = {
    labels: labels, // [..]
    datasets: datasets, // [{..}, {..}, {..}]
  };

  const options = Options(
    'Network Out',
    'Number of bytes sent out for each EC2 instance at 8 hour intervals for the past week.',
    'EC2 Instance Ids'
  );

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default NetworkOutChart;
