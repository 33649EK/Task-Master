import React, { useState, useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, FloatButton, Modal } from 'antd';
import Auth from '../../utils/auth';
import { InfoCircleOutlined, DollarOutlined, CustomerServiceOutlined, CommentOutlined, HeatMapOutlined, MoonOutlined} from '@ant-design/icons';
import RainSvg from '../Svg/Rain';
import rainSound from '../../assets/rain&vibe.mp3'
import pianoSound from '../../assets/piano.mp3'
import poppySound from '../../assets/poppy.mp3'


const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const rainRef = useRef(null)
  const pianoRef = useRef(null)
  const poppyRef = useRef(null)
  
  useEffect(() => {
    if (!Auth.loggedIn()) {
      // If the current path is not '/' or '/signup', redirect to '/'
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/');
      }
    } else {
      // If the user is logged in and on '/', redirect to '/home'
      if (location.pathname === '/') {
        navigate('/home');
      }
    } if (rainRef.current) {
      rainRef.current.volume = 0.15;
    }
    if (pianoRef.current) {
      pianoRef.current.volume = 0.15;
    }
    if (poppyRef.current) {
      poppyRef.current.volume = 0.15;
    }
  }, [navigate, location.pathname]);

  const playRain = () => {
    if (rainRef.current) {
      if (!rainRef.current.paused) {
        rainRef.current.pause();
      } else {
        rainRef.current.currentTime = 0; 
        rainRef.current.play();
      }
    }
  };

  const playPiano = () => {
    if (pianoRef.current) {
      if (!pianoRef.current.paused) {
        pianoRef.current.pause();
      } else {
        pianoRef.current.currentTime = 0; 
        pianoRef.current.play();
      }
    }
  };

  const playPoppy = () => {
    if (poppyRef.current) {
      if (!poppyRef.current.paused) {
        poppyRef.current.pause();
      } else {
        poppyRef.current.currentTime = 0; 
        poppyRef.current.play();
      }
    }
  };

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
                <Button type="primary" className="m-2">
                  View My Profile
                </Button>
              </Link>
              <Button className="m-2" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button type="primary" className="m-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button type="secondary" className="m-2">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Floating buttons for About and Donate, these need some styling work */}
      {/* Floating buttons container */}
      <div className="floating-buttons-container">
        <FloatButton.Group>
          <FloatButton
            icon={<InfoCircleOutlined />}
            tooltip="About"
            onClick={showAboutModal}
          />
          <Link to="https://buy.stripe.com/5kA3g7aFN8Im8bmeUU">
            <FloatButton icon={<DollarOutlined />} tooltip="Donate" />
          </Link>
        </FloatButton.Group>
      </div>
      <>

      {/* Music Select */}
    <FloatButton.Group
      trigger="click"
      style={{
        right: 80,
      }}
      icon={<CustomerServiceOutlined />}
      tooltip="Calming Sounds"
    >

      <FloatButton icon={<RainSvg />} onClick={playRain} />
      <FloatButton icon={<MoonOutlined />} onClick={playPiano} />
      <FloatButton icon={<HeatMapOutlined />} onClick={playPoppy} />
    </FloatButton.Group>
    <audio ref={rainRef} src={rainSound} hidden></audio>
    <audio ref={pianoRef} src={pianoSound} hidden></audio>
    <audio ref={poppyRef} src={poppySound} hidden></audio>
  </>

      {/* Modal for About button */}
      <Modal
        title="About Task Manager"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ fontSize: '24px' }}
      >
        <p>
Task Manager is your go-to platform for efficient task management and productivity enhancement. Our mission is to provide intuitive tools that help individuals and teams stay organized, focused, and productive.<br />

<strong>Task Tracking:</strong> Easily manage your tasks and deadlines with our intuitive task tracking system.<br />
<strong>Time Management:</strong> Take control of your time with our built-in timer feature.<br />
<strong>Break Meditation:</strong> Recharge and refocus with guided meditation sessions on our break meditation screen.<br />
<strong>To-Do List:</strong> Stay organized with our customizable to-do list.<br />
<strong>Secure Access:</strong> Enjoy peace of mind with our secure login/logout functionality.<br />
<strong>Get Started Today!</strong><br />
Sign up for Task Manager and start optimizing your productivity today! Whether you're a student, professional, or entrepreneur, Task Manager has everything you need to succeed.
        </p>
      </Modal>
    </>
  );
};

export default Header;

