import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(`Name: ${name}, Value: ${value}`);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    // console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signup-page-container">
      <Card className="signup-card">
        <p className="signup-subtitle">
          New here? Sign up below! Already have an account?{' '}
          <Link to="/login">Login!</Link>
        </p>
        <Form name="signup" onFinish={handleFormSubmit} className="signup-form">
          <Form.Item
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              name="name"
              prefix={<UserOutlined />}
              placeholder="Your username"
              value={formState.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              name="email"
              prefix={<MailOutlined />}
              placeholder="Your email"
              value={formState.email}
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
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
        {error && <div className="signup-error">{error.message}</div>}
      </Card>
    </div>
  );
};

export default Signup;

