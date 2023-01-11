import React, { useState } from 'react';
import '../componentStyling/Navbar.scss';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  

  return (
    <div className="navbar" id="cloud-intro">
      {/* <nav> */}
      <h1>Cloudband</h1>
        <div className="theme-switch-wrapper">
          <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" />
              <div class="slider-round"></div>
            </label>
            <b>Enable Dark Mode</b>
        {/* <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Signup</a>
        </li>
      </ul> */}
      {/* </nav> */}
      </div>
    </div>
  );
}

export default Navbar;
