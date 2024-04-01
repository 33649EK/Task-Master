//none of this is done just put this in here for functionality while working on the timer thing 

import React from 'react';
import { Card, Checkbox, Input } from 'antd';

const ToDoList = () => {

  return (
    <Card title="To Do">
      <Checkbox><Input placeholder="Wash the Dishes" /></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
      <Checkbox><Input></Input></Checkbox>
    </Card>
  );
};

export default ToDoList;

