import React from 'react';
import '../componentStyling/PrivacyPolicy.scss';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-wrapper">
      <h1>Privacy Policy</h1>
      <p>
        Cloudband is committed to protecting the privacy of our users. Our web
        app, Cloudband, is designed to provide AWS developers with the ability
        to visualize different AWS resource metrics in real time. We do not
        collect any personal information from our users.
        <br />
        <br />
        We understand the importance of user privacy, and we do not collect,
        store, or share any personal information from our users. Our app does
        not use cookies, tracking pixels, or any other form of data collection.
        <br />
        <br />
        Our app may contain links to third-party websites or services. We are
        not responsible for the privacy practices or content of these
        third-party websites or services.
        <br />
        <br />
        We encourage users to read the privacy policies of any third-party
        websites or services before providing any personal information. If you
        have any questions or concerns about our privacy policy, please contact
        us at&nbsp;
        <a href="mailto:cloudbandEC37@gmail.com">cloudbandEC37@gmail.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
