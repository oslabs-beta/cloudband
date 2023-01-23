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
import '../componentStyling/LambdaChartStyling.scss';

const ErrorsChart = (props) => {
  const { chartData } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lambda Area Chart',
      },
    },
  };

  const labels = chartData.timeStamps;

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
