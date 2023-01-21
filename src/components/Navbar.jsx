import '../componentStyling/Navbar.scss';
import React from 'react';

function Navbar(props) {
  const { setShowPage } = props;

  const handleClick = (event) => {
    setShowPage(event.target.value);
  };

  return (
    <div className="navbar-wrapper" id="cloud-intro">
      <h1>Cloudband</h1>
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
          <a href="/" onClick={handleClick} value="login">
            Login
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
