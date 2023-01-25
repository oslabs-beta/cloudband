import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Options from './LineChartOptions.js';
import { Colors, ColorsHalfOpacity } from './ColorGenerator.js';
import '../componentStyling/EC2ChartStyling.scss';

const CPUUtilizationChart = (props) => {
  const { chartData } = props;
  console.log('cpu utilization data: ', chartData);
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
    'CPU Utilization',
    'Utilization as a percentage across all EC2 instances every eight hours for the past week.'
  );

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default CPUUtilizationChart;
