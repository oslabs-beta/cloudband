import React from 'react';
import '../componentStyling/Settings.scss';

const Settings = (props) => {
  const { ec2Metric, setEc2Metric } = props;
  const onChange = (event) => {
    setEc2Metric(event.target.value);
  };
  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      <span>Dropdown here</span>
    </div>
  );
};

export default Settings;
