import React from 'react';
import { Layout, Button, List, Input, Checkbox } from 'antd';
const { Header, Footer, Content, Sider } = Layout;


const HomePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{ background: '#fff', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2>To-Do List</h2>
          <Input.Search placeholder="Add a task" enterButton="Add" size="large" />
        </div>
        <List
          dataSource={['Task 1', 'Task 2', 'Task 3']}
          renderItem={item => (
            <List.Item>
              <Checkbox>{item}</Checkbox>
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px' }}>
          <h1>Timer</h1>
        </Header>
        <Content style={{ padding: '24px', textAlign: 'center' }}>
          {/* Timer component can be implemented here */}
          <h2>00:00:00</h2>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Button type="primary">Button 1</Button>
          <Button type="primary">Button 2</Button>
          <Button type="primary">Button 3</Button>
          <Button type="primary">Button 4</Button>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
