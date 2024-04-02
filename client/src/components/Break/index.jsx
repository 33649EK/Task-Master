import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;
const { Paragraph } = Typography;

const HomePage = () => {
  const contentStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #ff7300, #fc0070, #00bcd4, #00ff99)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 20s ease infinite',
  };

  return (
    <Layout>
      <Content span={24} style={contentStyle}>
        <Paragraph style={{ textAlign: 'center', color: '#fff', paddingTop: '50vh' }}>
          Breathe In, Breathe Out
        </Paragraph>
      </Content>
    </Layout>
  );
};

export default HomePage;
