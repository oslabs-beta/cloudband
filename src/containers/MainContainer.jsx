import React from 'react';
import InputToken from '../components/InputToken.jsx';
import Chart from "../components/Chart.jsx"
import '../containerStyling/MainContainer.scss';

const MainContainer = () => {
    return (
      <div className="background-clouds">
      <div className="main-container-wrapper">
        <InputToken />
        <Chart />
      </div>
     </div>
    );
};

export default MainContainer;