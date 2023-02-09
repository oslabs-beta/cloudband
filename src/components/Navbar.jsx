import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../componentStyling/Navbar.scss';

//declare a constant Navbar and set it equal to an arrow function that takes in props as a parameter
function Navbar(props) {
  //declare a constant navigate and set it equal to the invocation of the useNavigate hook
  const navigate = useNavigate();
  //declare a constant loggedIn and set it equal to the value of the loggedIn property on the props object
  const { loggedIn, setLoggedIn } = props;

  //declare a constant logoutUser and set it equal to an arrow function that takes in event as a parameter
  const logoutUser = (event) => {
    //make a request to the /logout endpoint and then invoke the setLoggedIn function and pass in false as an argument and then return the invocation of the navigate function and pass in '/login' as an argument
    axios.delete('/logout').then(() => {
      setLoggedIn(false);
      return navigate('/login');
    });
  };

  //declare a constant redirectToVisualizer and set it equal to an arrow function that returns the invocation of the navigate function and pass in '/visualizer' as an argument
  const redirectToVisualizer = () => {
    return navigate('/visualizer');
  };

  //if loggedIn is truthy then return the following JSX
  if (loggedIn) {
    return (
      <div className="navbar-wrapper" id="cloud-intro">
        <div className="row">
          <img
            src="https://cloudband.s3.amazonaws.com/tk0885_geometric_minimal_cloud_Logo_line_simple_4cc0c0da-cbd9-4d57-b6c8-d892979e2c27.png"
            alt="clouds-with-structural-lines"
            className="logo-img"
          />
          <a href="/" className="logo">
            Cloudband
          </a>
        </div>
        <ul className="menu-items">
          <li>
            <button onClick={redirectToVisualizer}>App</button>
          </li>
          <li>
            <a href="https://github.com/oslabs-beta/cloudband" target="_blank">
              Github
            </a>
          </li>
          <li>
            <button value="logout" onClick={logoutUser}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
    //otherwise, return the following JSX
  } else {
    return (
      <div className="navbar-wrapper" id="cloud-intro">
        <div className="row">
          <img
            src="https://cloudband.s3.amazonaws.com/tk0885_geometric_minimal_cloud_Logo_line_simple_4cc0c0da-cbd9-4d57-b6c8-d892979e2c27.png"
            alt="clouds-with-structural-lines"
            className="logo-img"
          />
          <a href="/" className="logo">
            Cloudband
          </a>
        </div>
        <ul className="menu-items">
          <li>
            <a href="#team-section">Team</a>
          </li>
          <li>
            <a href="https://github.com/oslabs-beta/cloudband" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="/login" value="login">
              Login
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
