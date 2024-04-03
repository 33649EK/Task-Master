import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, FloatButton, Modal } from 'antd';
import Auth from '../../utils/auth';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      // If the current path is not '/' or '/signup', redirect to '/'
      if (location.pathname !== '/' && location.pathname !== '/signup') {
        navigate('/');
      }
    } else {
      // If the user is logged in and on '/', redirect to '/home'
      if (location.pathname === '/') {
        navigate('/home');
      }
    }
  }, [navigate, location.pathname]);

  const showAboutModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <header className="header header-main">
        <div className="header-content">
          <Link to="/">
            <h1 className="header-title m-0">TaskMaster</h1>
          </Link>
          <p className="header-description m-0">
            Use your time better or something.
          </p>
        </div>

        {/* Auth buttons */}
        <div className="auth-buttons">
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                <Button type="primary" className="m-2">View My Profile</Button>
              </Link>
              <Button className="m-2" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/">
                <Button type="primary" className="m-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button type="secondary" className="m-2">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Floating buttons for About and Donate, these need some styling work */}
       {/* Floating buttons container */}
      <div className="floating-buttons-container">
        <FloatButton.Group>
          <FloatButton icon={<InfoCircleOutlined />} tooltip="About" onClick={showAboutModal} />
          <Link to="https://buy.stripe.com/5kA3g7aFN8Im8bmeUU">
            <FloatButton icon={<DollarOutlined />} tooltip="Donate" />
          </Link>
        </FloatButton.Group>
      </div>

      {/* Modal for About button */}
      <Modal title="About TaskMaster" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Why use TaskMaster? We all have busy schedules, and we all have too much on our plate sometimes.
          TaskMaster will help you track your tasks and help you schedule well needed breaks too!
        </p>
      </Modal>
    </>
  );
};

export default Header;