import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../componentStyling/Navbar.scss';

function Navbar(props) {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = props;

  const logoutUser = (event) => {
    axios.delete('/api/logout').then(() => {
      setLoggedIn(false);
      return navigate('/login');
    });
  };

  const redirectToVisualizer = () => {
    return navigate('/visualizer');
  };

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
