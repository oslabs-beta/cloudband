import '../componentStyling/Navbar.scss';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar-wrapper" id="cloud-intro">
      <a href="/" className="logo">
        Cloudband
      </a>
      <ul className="menu-items">
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a
            href="https://github.com/orgs/oslabs-beta/teams/cloudband"
            target="_blank"
          >
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
