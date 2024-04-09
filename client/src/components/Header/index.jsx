import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, FloatButton, Modal } from 'antd';
import Auth from '../../utils/auth';
import { InfoCircleOutlined, DollarOutlined, CustomerServiceOutlined, HeatMapOutlined, MoonOutlined } from '@ant-design/icons';
import RainSvg from '../Svg/Rain';
import SkullSvg from '../Svg/Skull';
import TrumpetSvg from '../Svg/Trumpet';
import MetalSvg from '../Svg/Metal';
import BassSvg from '../Svg/Bass';
import MagicSvg from '../Svg/Magic';
import rainSound from '../../assets/rain&vibe.mp3';
import pianoSound from '../../assets/piano.mp3';
import poppySound from '../../assets/poppy.mp3';
import spookySound from '../../assets/spooky.mp3';
import funkySound from '../../assets/funky.mp3';
import bassSound from '../../assets/bass.mp3';
import metalSound from '../../assets/metal.mp3';
import magicSound from '../../assets/magic.mp3';

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const rainRef = useRef(null);
  const pianoRef = useRef(null);
  const poppyRef = useRef(null);
  const spookyRef = useRef(null);
  const funkyRef = useRef(null);
  const bassRef = useRef(null);
  const metalRef = useRef(null);
  const magicRef = useRef(null);

  useEffect(() => {
    if (!Auth.loggedIn()) {
      // Redirect to '/' if not logged in
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/');
      }
    } else {
      // Redirect to '/home' if logged in and on '/'
      if (location.pathname === '/') {
        navigate('/home');
      }
    }
    if (rainRef.current) {
      rainRef.current.volume = 0.5;
    }
    if (pianoRef.current) {
      pianoRef.current.volume = 0.5;
    }
    if (poppyRef.current) {
      poppyRef.current.volume = 0.5;
    }
    if (spookyRef.current) {
      spookyRef.current.volume = 0.7;
    }
    if (funkyRef.current) {
      funkyRef.current.volume = 0.5;
    }
    if (bassRef.current) {
      bassRef.current.volume = 0.5;
    }
    if (metalRef.current) {
      metalRef.current.volume = 0.5;
    }
    if (magicRef.current) {
      magicRef.current.volume = 0.5;
    }
  }, [navigate, location.pathname]);

  const playRain = () => {
    // Play or pause rain sound
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
    // Play or pause piano sound
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
    // Play or pause poppy sound
    if (poppyRef.current) {
      if (!poppyRef.current.paused) {
        poppyRef.current.pause();
      } else {
        poppyRef.current.currentTime = 0;
        poppyRef.current.play();
      }
    }
  };

const playSpooky = () => {
  // Play or pause spooky sound
  if (spookyRef.current) {
    if (!spookyRef.current.paused) {
      spookyRef.current.pause();
    } else {
      spookyRef.current.currentTime = 0;
      spookyRef.current.play();
    }
  }
};

const playFunky = () => {
  // Play or pause funky sound
  if (funkyRef.current) {
    if (!funkyRef.current.paused) {
      funkyRef.current.pause();
    } else {
      funkyRef.current.currentTime = 0;
      funkyRef.current.play();
    }
  }
};

const playBass = () => {
  // Play or pause bass sound
  if (bassRef.current) {
    if (!bassRef.current.paused) {
      bassRef.current.pause();
    } else {
      bassRef.current.currentTime = 0;
      bassRef.current.play();
    }
  }
};

const playMetal = () => {
  // Play or pause metal sound
  if (metalRef.current) {
    if (!metalRef.current.paused) {
      metalRef.current.pause();
    } else {
      metalRef.current.currentTime = 0;
      metalRef.current.play();
    }
  }
};

const playMagic = () => {
  // Play or pause magic sound
  if (magicRef.current) {
    if (!magicRef.current.paused) {
      magicRef.current.pause();
    } else {
      magicRef.current.currentTime = 0;
      magicRef.current.play();
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
    navigate('/');
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
            Time to get organized!
          </p>
        </div>

        {/* Auth buttons */}
        <div className="auth-buttons">
          {Auth.loggedIn() ? (
            <>
              <Link to={location.pathname === '/home' ? '/me' : '/home'}>
                <Button type="primary" className="m-2">
                  {location.pathname === '/home' ? 'View My Profile' : 'Home'}
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

      {/* Floating buttons for About and Donate */}
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

      {/* Floating buttons for Music Select */}
      <FloatButton.Group
        trigger="click"
        style={{
          right: 80,
        }}
        icon={<CustomerServiceOutlined />}
        tooltip="Calming Sounds"
      >
        <FloatButton icon={<SkullSvg />} onClick={playSpooky} tooltip="Beware"/>
        <FloatButton icon={<BassSvg />} onClick={playBass} tooltip="Bassy"/>
        <FloatButton icon={<MetalSvg />} onClick={playMetal} tooltip="Metal"/>
        <FloatButton icon={<TrumpetSvg />} onClick={playFunky} tooltip="Funky"/>
        <FloatButton icon={<MagicSvg />} onClick={playMagic} tooltip="magic"/>
        <FloatButton icon={<RainSvg />} onClick={playRain} tooltip="Rain"/>
        <FloatButton icon={<MoonOutlined />} onClick={playPiano} tooltip="Piano"/>
        <FloatButton icon={<HeatMapOutlined />} onClick={playPoppy} tooltip="Poppy"/>
      </FloatButton.Group>

      {/* Audio elements */}
      <audio ref={rainRef} src={rainSound} hidden></audio>
      <audio ref={pianoRef} src={pianoSound} hidden></audio>
      <audio ref={poppyRef} src={poppySound} hidden></audio>
      <audio ref={spookyRef} src={spookySound} hidden></audio>
      <audio ref={funkyRef} src={funkySound} hidden></audio>
      <audio ref={bassRef} src={bassSound} hidden></audio>
      <audio ref={metalRef} src={metalSound} hidden></audio>
      <audio ref={magicRef} src={magicSound} hidden></audio>

      {/* Modal for About button */}
      <Modal
        title="About Task Master"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ fontSize: '25px', textAlign: 'center' }}
        closeIcon={<div style={{ position: 'absolute', top: '4px', right: '10px' }}>X</div>}
      >
        <p>
          Struggling to stay on top of your to do lists? Having a difficult time focusing? <strong>Let us help!</strong><br />
          <p></p>
          Task Master is your new go-to app for keeping track of everything you need to do, and maintaining focus so you can crush your to do list with ease!
        </p>
      </Modal>
    </>
  );
};

export default Header;
