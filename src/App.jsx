import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import LandingPage from './components/LandingPage.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import './styles.scss';

const App = () => {
  return (
    <div className="router">
      <Navbar />
      <hr />
      <div className="routerMain" id="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/visualizer" element={<MainContainer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default App;
