import React from 'react';
import { Layout } from 'antd';
import Timers from '../components/Timers';
import ToDoList from '../components/ToDoList';
import Calendar from '../components/Calendar';

const { Content } = Layout;


const HomePage = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: '15px', background: 'transparent' }}>
      <Content style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent' }}>
        {/* To Do List section */}
        <div style={{ width: '48%', marginRight: '2%', background: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '8px' }}>
          <ToDoList />
        </div>

        {/* Right side container for Timer and Calendar (put this here so the timer doesnt expand with the to do list) */}
        <div style={{ width: '48%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Timer section */}
          <div style={{ width: '100%', marginBottom: '20px', background: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '8px' }}>
            <Timers />
          </div>
          {/* Calendar section */}
          <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '8px' }}>
            <Calendar />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;