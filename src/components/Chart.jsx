import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import '../componentStyling/Chart.scss';

const LineChart = () => {
  const [chartData, setChartData] = useState({ timestamps: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/test');
      const data = await response.json();
      setChartData(data);
    };
    fetchData();
  }, []);

  const labels = [...chartData.timestamps];

  const values = [...chartData.values];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: values,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} className="chart-content" />
    </div>
  );
};

export default LineChart;
