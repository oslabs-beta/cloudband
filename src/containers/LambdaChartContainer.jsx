import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../containerStyling/ChartContainer.scss';

const LambdaChartContainer = (props) => {
  const { arn, currFunc } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getLambdaMetrics`, {
        params: {
          arn,
          currFunc,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function switchCharts() {}

  // return <div className="chart-container-wrapper">{switchCharts()}</div>;
  return (
    <div>
      <h2>Lambda Chart Container</h2>
    </div>
  );
};

export default LambdaChartContainer;
