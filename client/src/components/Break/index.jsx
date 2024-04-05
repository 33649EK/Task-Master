import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;
const { Paragraph } = Typography;

const HomePage = () => {
  // Styled component for applying the background animation
  const StyledContent = styled(Content)`
    min-height: 100vh;
    background: linear-gradient(-45deg, #155725, #153b57, #9e9c1b);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    @keyframes gradient {
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

  return (
    <Layout>
      <StyledContent span={24}>
        <Paragraph style={{ textAlign: 'center', color: '#fff', paddingTop: '50vh' }}>
          Breathe In, Breathe Out
        </Paragraph>
      </StyledContent>
    </Layout>
  );
};

export default HomePage;
