import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

const PolarChart = (props) => {
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const { chartData } = props;
  console.log('chartData : ', chartData);

  // const maxValues = chartData.values.map((array) => {
  //   return Math.max(array);
  // });

  // console.log(maxValues);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart;
