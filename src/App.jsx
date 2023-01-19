import React from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import './styles.scss';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <hr />
      <MainContainer />
      <Footer />
    </div>
  );
};

export default App;
