import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import LandingPage from './components/LandingPage.jsx';
import './styles.scss';

const App = () => {
  const [showPage, setShowPage] = useState('landing-page');

  // const switchPage = () => {
  //   if (showPage === 'landing-page') {
  //     return <LandingPage />;
  //   } else if (showPage === 'signup') {
  //     return <Signup />;
  //   } else if (showPage === 'login') {
  //     console.log('showPage in App: ', showPage);
  //     return <MainContainer />;
  //   }
  // };

  // useEffect(() => {
  //   switchPage();
  // }, [showPage]);

  // return (
  //   <div className="app">
  //     <Navbar setShowPage={setShowPage} />
  //     <hr />
  //     {switchPage}
  //     <Footer />
  //   </div>
  // );

  return (
    <div className="app">
      <Navbar />
      <hr />
      {/* <Signup /> */}
      <Login />
      <hr />
      <Footer />
    </div>
  );
};

export default App;
