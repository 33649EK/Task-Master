import React from "react";
import { Layout, Card, Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Profile = () => {
  const { profileId } = useParams();

  const isLoggedIn = Auth.loggedIn();
  if (isLoggedIn && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  const { loading, data } = useQuery(profileId ? QUERY_SINGLE_PROFILE : QUERY_ME);

  const profile = data?.me || data?.profile;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !profile?.name) {
    return (
      <h4 style={{ color: 'var(--darkestblue)' }}>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: "24px" }}>
        <Card title="Time Spent" style={{ marginBottom: "24px", backgroundColor: 'var(--lightblue)', color: 'var(--white)' }}>
          <Title level={2} style={{ color: 'var(--dark)' }}>{profile.timeSpent}</Title>
          <Paragraph style={{ color: 'var(--dark)' }}>Time spent on the platform</Paragraph>
        </Card>
        <Card title="Profile Information" style={{ backgroundColor: 'var(--purple)', color: 'var(--white)' }}>
          <Paragraph style={{ color: 'var(--dark)' }}>
            <strong>Name:</strong> {profile.name}
          </Paragraph>
          <Paragraph style={{ color: 'var(--dark)' }}>
            <strong>Email:</strong> {profile.email}
          </Paragraph>
          <Paragraph style={{ color: 'var(--dark)' }}>
            <strong>Friends:</strong> {profile.friends._id}
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default Profile;
