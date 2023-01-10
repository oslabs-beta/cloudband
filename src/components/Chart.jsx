import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../componentStyling/Chart.scss';

const LineChart = () => {
  const [chartData, setChartData] = useState({
    values: [],
    timestamps: [],
    instanceIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/test');
      const data = await response.json();
      const set = await setChartData(data);
    };
    fetchData();
  }, []);

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

  // function transparentize(value, opacity) {
  //   var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  //   return colorLib(value).alpha(alpha).rgbString();
  // }

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
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      // y1: {
      //   type: 'linear',
      //   display: true,
      //   position: 'right',
      //   grid: {
      //     drawOnChartArea: false,
      //   },
      // },
    },
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} className="chart-content" />
    </div>
  );
};

export default LineChart;
