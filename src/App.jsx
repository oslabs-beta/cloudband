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
  const [loggedIn, setLoggedIn] = useState(false);
  const [arn, setArn] = useState();
  const [region, setRegion] = useState();
  return (
    <div className="router">
      <Navbar />
      <hr />
      <div className="routerMain" id="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setArn={setArn}
                setRegion={setRegion}
              />
            }
          />
          <Route path="/get-started" element={<Signup />} />
          <Route
            path="/visualizer"
            element={
              <MainContainer loggedIn={loggedIn} arn={arn} region={region} />
            }
          />
        </Routes>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default App;
