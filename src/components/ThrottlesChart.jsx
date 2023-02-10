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

//declare a constant ThrottlesChart, pass in props as a parameter. Destructure chartData from props in order to access the chartData prop
const ThrottlesChart = (props) => {
  const { chartData } = props;

  //declare a constant options and set it equal to the Options function in order to set the options for the chart
  const options = Options(
    'Throttles',
    'The sum of throttles on this function every hour for the past week.'
  );

  //declare a constant labels and use the map method to iterate over the timestamps array and return a new array of timestamps for each element in the array. 
  const labels = chartData.timestamps
    .map((timestamp) => {
      //declare a constant date and set it equal to a new Date object with the timestamp as a parameter
      const date = new Date(timestamp);
      //declare a constant month and set it equal to the month of the date object plus 1 in order to display the correct month
      const month = date.getMonth() + 1;
      //declare a constant day and set it equal to the day of the date object
      const day = date.getDate();
      //declare a constant hour and set it equal to the hour of the date object
      let hour = date.getHours();
      //declare a constant minute and set it equal to the minutes of the date object
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
