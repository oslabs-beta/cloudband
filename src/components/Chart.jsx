import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../componentStyling/Chart.scss';

const LineChart = (props) => {
  const { chartData, setChartData } = props;

  const labels = chartData.timestamps;

  const CHART_COLORS = {
    0: 'rgb(255, 99, 132)',
    1: 'rgb(255, 159, 64)',
    2: 'rgb(255, 205, 86)',
    3: 'rgb(75, 192, 192)',
    4: 'rgb(54, 162, 235)',
    5: 'rgb(153, 102, 255)',
    6: 'rgb(201, 203, 207)',
  };

  const datasets = chartData.values.map((array, index) => {
    return {
      label: `EC2 Instance ${index + 1}`,
      data: array,
      borderColor: CHART_COLORS[index],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: `y`,
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Multi Axis Line Chart',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} className="chart-content" />
    </div>
  );
};

export default LineChart;
