import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import LandingPage from './components/LandingPage.jsx';
import './styles.scss';

const App = () => {
  return (
    <div className="router">
      <Navbar setShowPage={setShowPage} />
      <hr />
      <div className="routerMain" id="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/visualizer" element={<MainContainer />} />
        </Routes>
      </div>
      {/* <LandingPage /> */}
      <Footer />
    </div>
  );
};

export default App;
