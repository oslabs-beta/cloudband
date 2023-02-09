import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Options from './LineChartOptions.js';
import { Colors, ColorsHalfOpacity } from './ColorGenerator.js';
import '../componentStyling/EC2ChartStyling.scss';

//declare a constant CPUCreditBalanceChart and set it equal to an arrow function that takes in props as a parameter
const CPUUtilizationChart = (props) => {
  //declare a constant chartData and set it equal to props.chartData
  const { chartData } = props;
  // console.log('cpu utilization data: ', chartData);
  console.log('chartData', chartData);
  //declare a constant labels and use the map method to iterate over the timestamps array and return a new array of timestamps for each element in the timestamps array
  const labels = chartData.timestamps
    .map((timestamp) => {
      //convert the timestamp to a date object
      const date = new Date(timestamp);
      // const month = date.getMonth() + 1;
      // const day = date.getDate();
      //declare a constant hour and set it equal to the hour of the date object
      let hour = date.getHours();
      //declare a constant minute and set it equal to the minutes of the date object
      let minute = date.getMinutes();
      //if the hour is less than 10, add a 0 to the beginning of the hour
      if (hour < 10) {
        //add a 0 to the beginning of the hour
        hour = `0${hour}`;
      }
      //if the minute is less than 10, add a 0 to the beginning of the minute
      if (minute < 10) {
        //add a 0 to the beginning of the minute
        minute = `0${minute}`;
      }
      //return the hour and minute
      return `${hour}:${minute}`;
    })
    //reverse the array in order to display the most recent data first
    .reverse(); //[timestamps]

  //declare a constant datasets and use the map method to iterate over the values array and return a new array of objects for each element in the values array
  const datasets = chartData.values
  //reverse the array in order to display the most recent data first
    .map((array, index) => {
      //return an object with the following properties: label, data, borderColor, backgroundColor, and yAxisID in order to display the label, data, border color, background color, and y axis of the chart
      return {
        label: chartData.instanceIds[index],
        data: array,
        borderColor: Colors[index],
        backgroundColor: ColorsHalfOpacity[index],
        yAxisID: `y`,
      };
    })
    //reverse the array in order to display the most recent data first
    .reverse();

    //declare a constant data and set it equal to an object with the following properties: labels and datasets in order to display the labels and datasets of the chart
  const data = {
    labels: labels, // [..]
    datasets: datasets, // [{..}, {..}, {..}]
  };
  console.log('data in cpuchart', data);
  //declare a constant options and set it equal to the Options function that takes in a title and a description as parameters in order to display the title and description of the chart
  const options = Options(
    'CPU Utilization',
    'Utilization as a percentage across all EC2 instances every eight hours for the past week.'
  );

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
};

export default CPUUtilizationChart;
