import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import LandingPage from './components/LandingPage.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import './styles.scss';

const App = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [arn, setArn] = useState();
  const [region, setRegion] = useState();

  // check for session using cookie to persist login status, arn, and region
  useEffect(() => {
    axios
      .get('/api/checkSession')
      .then((response) => {
        if (response.data.user) {
          setLoggedIn(true);
          setArn(response.data.user.RoleARN);
          setRegion(response.data.user.region);
        } else setLoggedIn(false);
      })
      .catch((error) => {
        console.error('error in sign up request: ', error);
      });
  }, []);

  return (
    <div className="router">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default App;
