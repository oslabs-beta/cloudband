import React from 'react';
import '../componentStyling/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="row-1-wrapper">
        <div className="col-1-wrapper">
          <h1 id="logo">Cloudband</h1>
          <p>
            Cloudband is open source. Help us make our app better:&nbsp;
            <a href="https://github.com/oslabs-beta/cloudband" target="_blank">
              Github
            </a>
          </p>
        </div>
        <div className="col-2-wrapper">
          <h2 className="col-header">Quick Links</h2>
          <ul className="quick-links-list">
            <li>
              <a href="#" target="_blank">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="col-3-wrapper">
          <h2 className="col-header">Contact Us</h2>
          <p>
            Email us at&nbsp;
            <a href="mailto:cloudbandEC37@gmail.com">cloudbandEC37@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
