import React from 'react';
import InputToken from '../components/InputToken.jsx';
import Settings from '../components/Settings.jsx';
import '../containerStyling/SidebarContainer.scss';

const SidebarContainer = (props) => {
  const { status, setChartData, setStatus, ec2Metric, setEc2Metric } = props;

  return (
    <div className="sidebar-wrapper">
      {(() => {
        switch (status) {
          case 'start':
            return (
              <InputToken
                setChartData={setChartData}
                setStatus={setStatus}
                status={status}
              />
            );
          case 'authorized':
            return (
              <div>
                <Settings ec2Metric={ec2Metric} setEc2Metric={setEc2Metric} />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SidebarContainer;
