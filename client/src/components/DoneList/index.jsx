//none of this is done just put this in here for functionality while working on the timer thing 



import React from 'react';
import { List, Card, Checkbox } from 'antd';

const DoneList = () => {
  // pretend tasks
  const tasks = [
    { title: 'Task A', completed: true },
    { title: 'Task B', completed: true },
  ];

  return (
    <Card title="Done">
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Checkbox checked={item.completed} />}
              title={item.title}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DoneList;
