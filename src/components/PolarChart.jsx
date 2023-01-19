import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import '../componentStyling/Chart.scss';

const PolarChart = (props) => {
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const { chartData } = props;

  const maxValues = chartData.values.map((array) => {
    return Math.max(...array);
  });

  console.log('maxValues: ', maxValues);

  const data = {
    labels: chartData.instanceIds,
    datasets: [
      {
        label: '# of Votes',
        data: maxValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          // 'rgba(75, 192, 192, 0.5)',
          // 'rgba(153, 102, 255, 0.5)',
          // 'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart;
