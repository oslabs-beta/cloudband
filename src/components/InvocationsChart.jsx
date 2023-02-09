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

//declare a constant InvocationsChart and set it equal to an arrow function that takes in props as a parameter in order to access the chartData prop
const InvocationsChart = (props) => {
  const { chartData } = props;
  //declare a constant options and set it equal to the Options function in order to set the options for the chart
  const options = Options(
    'Invocations',
    'The sum of invocations of this function every hour for the past week.'
  );

  //declare a constant labels and use the map method to iterate over the timestamps array and return a new array of timestamps for each element in the timestamps array in order to display the timestamps on the x-axis
  const labels = chartData.timestamps
    .map((timestamp) => {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      //if the hour is less than 10, add a 0 to the beginning of the hour
      if (hour < 10) {
        hour = `0${hour}`;
      }
      //if the minute is less than 10, add a 0 to the beginning of the minute
      if (minute < 10) {
        minute = `0${minute}`;
      }
      //return the month, day, hour, and minute in order to display the time in the format of 00/00 00:00
      return `${month}/${day} ${hour}:${minute}`;
    })
    //reverse the array in order to display the most recent data first
    .reverse(); //[timestamps]

  //declare a constant data and set it equal to an object with the following properties: labels and datasets in order to display the data on the chart
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Invocations',
        data: chartData.values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="lambda-chart-wrapper">
      <Line options={options} data={data} />
    </div>
  );
};

export default InvocationsChart;
