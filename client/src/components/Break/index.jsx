import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;
const { Paragraph } = Typography;

const HomePage = () => {
  // Styled component for applying the background animation
  const StyledContent = styled(Content)`
    min-height: 100vh;
    background: linear-gradient(270deg, #00ffbd, #006fd3);
    background-size: 400% 400%;

    @keyframes breathanim {
      0% {
        background-position: 0% 86%;
      }
      50% {
        background-position: 100% 15%;
      }
      100% {
        background-position: 0% 86%;
      }
    }

    animation: breathanim 16s ease infinite;
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
