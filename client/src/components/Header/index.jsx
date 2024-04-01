import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, FloatButton, Modal } from 'antd';
import Auth from '../../utils/auth';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              <Link to="/login">
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
      <Modal title="About Tomato Timer" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Why use tomato timer? Well basically blah blah some information.</p>
      </Modal>
    </>
  );
};

export default Header;