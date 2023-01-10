import React from 'react';
import InputToken from '../components/InputToken.jsx';
import Chart from "../components/Chart.jsx"
import '../containerStyling/MainContainer.scss';

const MainContainer = () => {
    return (
      <div className="main-container-wrapper" id="cloud-intro">
        <InputToken />
        <Chart />
      </div>
    );
};

export default MainContainer;