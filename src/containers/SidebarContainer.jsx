import React from 'react';
import InputToken from '../components/InputToken.jsx';
import EC2Settings from '../components/EC2Settings.jsx';
import '../containerStyling/SidebarContainer.scss';

const SidebarContainer = (props) => {
  const {
    status,
    setChartData,
    setStatus,
    ec2Metric,
    setEc2Metric,
    arn,
    setArn,
  } = props;

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
                arn={arn}
                setArn={setArn}
              />
            );
          case 'authorized':
            return (
              <div>
                <EC2Settings
                  ec2Metric={ec2Metric}
                  setEc2Metric={setEc2Metric}
                />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SidebarContainer;
