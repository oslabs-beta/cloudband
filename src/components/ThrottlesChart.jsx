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

const ThrottlesChart = (props) => {
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
        label: 'Throttles',
        data: chartData.values,
        borderColor: 'rgb(201, 203, 207)',
        backgroundColor: 'rgba(201, 203, 207, 0.5)',
      },
    ],
  };

  return (
    <div className="lambda-chart-wrapper">
      <Line options={options} data={data} />
    </div>
  );
};

export default ThrottlesChart;
