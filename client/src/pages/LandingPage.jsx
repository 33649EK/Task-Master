import React from 'react';
import { Card } from 'antd';

const LandingPage = () => {
  return (
    <>
      <Card title="Welcome to Task Master!" className="landing-page-card">
        <p className="landing-page-description">
          Task Master is your go-to platform for efficient task management and productivity enhancement. Our mission is to provide intuitive tools that help individuals and teams stay organized, focused, and productive.
        </p>
        <ul className="landing-page-features">
          <li><strong>Task Tracking:</strong> Easily manage your tasks and deadlines with our intuitive task tracking system.</li>
          <li><strong>Time Management:</strong> Take control of your time with our built-in timer feature.</li>
          <li><strong>Break Meditation:</strong> Recharge and refocus with guided meditation sessions on our break meditation screen.</li>
          <li><strong>To-Do List:</strong> Stay organized with our customizable to-do list.</li>
          <li><strong>Secure Access:</strong> Enjoy peace of mind with our secure login/logout functionality.</li>
        </ul>
        <div className="landing-page-call-to-action">
          Get started with Task Master today!
        </div>
      </Card>
    </>
  );
};

export default LandingPage;