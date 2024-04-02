import React from 'react';
import { Layout, Button, List, Input, Checkbox } from 'antd';
import Timers from '../components/Timers';
import ToDoList from '../components/ToDoList';
const { Header, Footer, Content, Sider } = Layout;


const HomePage = () => {
  return (
    <Layout>
      <Sider width={300} style={{ background: '#fff', padding: '10px' }}>
        <ToDoList></ToDoList>
      </Sider>
      <Layout>
          <Timers></Timers>
      </Layout>
    </Layout>
  );
};

export default HomePage;
