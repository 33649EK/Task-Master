//none of this is done just put this in here for functionality while working on the timer thing 

import React from 'react';
import { List, Card } from 'antd';

const ToDoList = () => {
  // made up stuff
  const tasks = [
    { title: 'Task 1' },
    { title: 'Task 2' },
    { title: 'Task 3' },
  ];

  return (
    <Card title="To Do">
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ToDoList;
