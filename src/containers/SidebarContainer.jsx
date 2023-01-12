import React from 'react';
import InputToken from '../components/InputToken.jsx';
import Settings from '../components/Settings.jsx';

const SidebarContainer = (props) => {
  const { status, setChartData, setStatus } = props;

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
                <Settings />
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SidebarContainer;
