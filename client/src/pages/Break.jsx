import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Content } = Layout;

const AnimatedBackground = styled(Content)`
  background: linear-gradient(45deg, #ff7300, #fc0070, #00bcd4, #00ff99);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const HomePage = () => {
  return (
    <Layout>
      <AnimatedBackground style={{ minHeight: '100vh' }}>
        <Paragraph>
            Breathe In, Breathe Out
        </Paragraph>
      </AnimatedBackground>
    </Layout>
  );
};

export default HomePage;
