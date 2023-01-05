import React from 'react';
import Navbar from "./components/Navbar.jsx";
import MainContainer from "./containers/MainContainer.jsx";
import './styles.scss';


const App = () => {

    return (
    <div className="app">
      <Navbar />
      <MainContainer />
    </div>
  );
}



export default App;