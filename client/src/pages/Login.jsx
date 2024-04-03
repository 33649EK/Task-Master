import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

import Auth from '../utils/auth';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    // console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  
  return (
    <div className="login-page-container">
      {data && data.login ? (
        <p className="success-message">
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <Card className="login-card">
          <div className="login-card-subheader">
            Already have an account? Log in here!
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleFormSubmit}
            className="login-form"
          >
          <Form.Item
            
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              name="email"
              prefix={<UserOutlined />}
              placeholder="Your email"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              name="password"
              prefix={<LockOutlined />}
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </Form.Item>
          </Form>
          {error && <div className="login-error">{error.message}</div>}
        </Card>
      )}
    </div>
  );
};


export default Login;
