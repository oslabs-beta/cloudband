import React from 'react';
import '../componentStyling/Settings.scss';

const Settings = (props) => {
  const { ec2Metric, setEc2Metric } = props;

  const onChange = (event) => {
    setEc2Metric(event.target.value);
  };
  return (
    <div className="settings-wrapper">
      <h2>EC2 Settings</h2>
      <label htmlFor="ec2-metrics">Choose a metric to view:</label>
      <section className="dropdown-wrapper">
        <select
          name="ec2-metrics"
          id="ec2-metrics"
          onChange={onChange}
          value={ec2Metric}
        >
          <option value="cpu-credits">CPU Credits</option>
          <option value="cpu-utilization">CPU Utilization</option>
          <option value="memory-utilization">Memory Utilization</option>
          <option value="network-in-out">Network In/Out</option>
          <option value="network-packets">Network Packets</option>
        </select>
      </section>
    </div>
  );
};

export default Settings;
