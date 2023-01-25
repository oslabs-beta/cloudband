import '../componentStyling/Navbar.scss';
import React from 'react';

function Navbar() {
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
          <a href="#">Team</a>
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

export default Navbar;
