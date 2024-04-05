import React from 'react';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { ADD_PROFILE, ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'antd'; // Assuming you're using Ant Design
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';


const FriendsTest = () => {
  const token = Auth.getProfile();
  
  const { loading, error, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { _id: token.data._id },
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [addProfile, { error: profileError, data: profileData }] = useMutation(ADD_PROFILE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    try {
      await addProfile({
        variables: { ...formState },
      });
      // Assuming you want to do something after adding the profile,
      // like logging in or redirecting
      setFormState({
        name: '',
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const handleDeleteFriend = async (event) => {
    try {
      await removeFriend({
        variables: { ...formState },
      });


    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Default to an empty array if friends are not available
  const friends = data?.singleProfile?.friends || [];

  return (
    <div>
      <h1>Friends List</h1>
      {friends.length ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>{friend.name}</li>
          ))}
        </ul>
      ) : (
        <p>No friends found.</p>
      )}
      <button onClick={() => console.log('Add friend clicked')}>
        Add Friend
      </button>
      <button onClick={() => console.log('Remove friend clicked')}>
        Remove Friend
      </button>

      <div className="signup-page-container">
        <Card className="signup-card">
          <Form name="signup" onFinish={handleFormSubmit} className="signup-form">
            <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input name="name" prefix={<UserOutlined />} placeholder="Your username" value={formState.name} onChange={handleChange} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input name="email" prefix={<MailOutlined />} placeholder="Your email" value={formState.email} onChange={handleChange} />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password name="password" prefix={<LockOutlined />} placeholder="Password" value={formState.password} onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {profileError && <div className="signup-error">{profileError.message}</div>}
        </Card>
      </div>
    </div>
  );
};
export default FriendsTest;
