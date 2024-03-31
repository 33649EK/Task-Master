import React from "react";
import { Layout, Card, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: "24px" }}>
        <Card title="Time Spent" style={{ marginBottom: "24px" }}>
          <Title level={2}>{profileId.timeSpent}</Title>
          <Paragraph>Time spent on the platform</Paragraph>
        </Card>
        <Card title="Profile Information">
          <Paragraph>
            <strong>Name:</strong> {profileId.name}
          </Paragraph>
          <Paragraph>
            <strong>Email:</strong> {profileId.email}
          </Paragraph>
          <Paragraph>
            <strong>Password:</strong> {profileId.password}
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default Profile;
