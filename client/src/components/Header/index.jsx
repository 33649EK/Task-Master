import { Link } from 'react-router-dom';
import { Button, FloatButton } from 'antd';
import Auth from '../../utils/auth';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';

const Header = () => {
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
                <Button className="m-2">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Floating buttons for About and Donate, these need some styling work */}
        {/* Floating buttons */}
        <div className="floating-buttons-container">
        <FloatButton.Group>
          <Link to="/about">
            <FloatButton icon={<InfoCircleOutlined />} tooltip="About" />
          </Link>
          <Link to="/donate">
            <FloatButton icon={<DollarOutlined />} tooltip="Donate" />
          </Link>
        </FloatButton.Group>
      </div>
      </>
  );
};

export default Header;
