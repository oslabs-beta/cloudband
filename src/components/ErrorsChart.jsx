import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Options from './AreaChartOptions.js';
import '../componentStyling/LambdaChartStyling.scss';

const ErrorsChart = (props) => {
  const { chartData } = props;

  const options = Options(
    'Errors',
    'Total errors for this function every hour for the past week.'
  );

  // const labels = chartData.timeStamps;
  const labels = chartData.timestamps
    .map((timestamp) => {
      const date = new Date(timestamp);
      // const month = date.getMonth() + 1;
      // const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      return `${hour}:${minute}`;
    })
    .reverse(); //[timestamps]

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Errors',
        data: chartData.values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="lambda-chart-wrapper">
      <Line options={options} data={data} />
    </div>
  );
};

export default ErrorsChart;
