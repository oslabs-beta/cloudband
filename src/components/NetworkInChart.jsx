import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Options from './LineChartOptions.js';
import { Colors, ColorsHalfOpacity } from './ColorGenerator.js';
import '../componentStyling/EC2ChartStyling.scss';

//declare a constant networkInChart and set it equal to an arrow function that takes in props as a parameter
const NetworkInChart = (props) => {
  //declare a constant chartData and set it equal to props.chartData
  const { chartData } = props;

  //declare a constant labels and use the map method to iterate over the timestamps array and return a new array of timestamps for each element in the timestamps array
  const labels = chartData.timestamps
    .map((timestamp) => {
      //convert the timestamp to a date object
      const date = new Date(timestamp);
      // const month = date.getMonth() + 1;
      // const day = date.getDate();
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
      //return the hour and minute
      return `${hour}:${minute}`;
    })
    //reverse the array in order to display the most recent data first
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
    'Network In',
    'Number of bytes sent in for each EC2 instance at 8 hour intervals for the past week.',
    'EC2 Instance Ids'
  );

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} className="chart-content" />
    </div>
  );
};

export default NetworkInChart;
