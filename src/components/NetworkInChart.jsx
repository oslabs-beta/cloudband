import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Options from './LineChartOptions.js';
import { Colors, ColorsHalfOpacity } from './ColorGenerator.js';
import '../componentStyling/EC2ChartStyling.scss';

const NetworkInChart = (props) => {
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

  const datasets = chartData.values
    .map((array, index) => {
      return {
        label: chartData.instanceIds[index],
        data: array,
        borderColor: Colors[index],
        backgroundColor: ColorsHalfOpacity[index],
        yAxisID: `y`,
      };
    })
    .reverse();

  const data = {
    labels: labels, // [..]
    datasets: datasets, // [{..}, {..}, {..}]
  };

  const options = Options(
    'Network In',
    'Number of bytes sent in for each EC2 instance at 8 hour intervals for the past week.',
    'EC2 Instance Ids'
  );

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} className="chart-content" />
    </div>
  );
};

export default NetworkInChart;
