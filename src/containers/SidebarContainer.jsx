import React from 'react';
import InputToken from '../components/InputToken.jsx';
import Settings from '../components/Settings.jsx';
import '../containerStyling/SidebarContainer.scss';

const SidebarContainer = (props) => {
  const {
    status,
    setStatus,
    ec2Metric,
    setEc2Metric,
    arn,
    setArn,
    tool,
    setTool,
    funcNames,
    setFuncNames,
  } = props;

  return (
    <div className="sidebar-wrapper">
      {(() => {
        switch (status) {
          case 'start':
            return (
              <InputToken
                setStatus={setStatus}
                status={status}
                arn={arn}
                setArn={setArn}
              />
            );
          case 'authorized':
            return (
              <div>
                <Settings
                  ec2Metric={ec2Metric}
                  setEc2Metric={setEc2Metric}
                  tool={tool}
                  setTool={setTool}
                  funcNames={funcNames}
                  setFuncNames={setFuncNames}
                />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SidebarContainer;
