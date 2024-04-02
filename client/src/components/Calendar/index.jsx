import React from 'react';
import { Calendar } from 'antd';

const LayoutComponent = () => {
  return (
    <div className="layout-container">
      <div className="side-by-side">
        <div>
          <Calendar fullscreen={false} className="timer-calendar" />
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;
