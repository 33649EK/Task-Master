import React, { useState } from 'react';
import { Card, Checkbox, Input, Button, Select } from 'antd';
const { Option } = Select;

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('low'); // default priority is set to low

  // Function to sort tasks by priority, idk if we want that but it felt like an idea 
  const sortTasks = (tasks) => {
    const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };
  const addTodo = () => {
    const newTodo = {
      id: Math.ceil(Math.random() * 10000), // changed to prevent duplicate ids in the data (maybe a better way to do this)
      text: input,
      priority: priority,
    };

    const newTodos = sortTasks([...todos, newTodo]);

    setTodos(newTodos);
    setInput('');
    setPriority('low'); // resets priority to default after adding the current task
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const priorityIndicator = (priority) => {
    switch (priority) {
      case 'high':
        return <span style={{ color: 'red' }}>!</span>;
      case 'medium':
        return <span style={{ color: 'orange' }}>•</span>;
      case 'low':
        return <span style={{ color: 'green' }}>•</span>;
      default:
        return null;
    }
  };

  return (
    <Card
      title={<div style={{ fontSize: '24px', color: '#615a58', textAlign: 'center' }}>To Do List</div>}
      className="todo-list-card"
    >
      <div className="add-task-row">
        <Input
          className="task-input"
          placeholder="Task Name here"
          value={input}
          onChange={handleInputChange}
        />
        <Select
          className="priority-selector"
          value={priority} 
          onChange={handlePriorityChange}
        >
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
        <Button className="add-task-button" onClick={addTodo}>
          Add Task
        </Button>
      </div>
      <ul className="task-list">
        {todos.map((todo) => (
          <li key={todo.id} className="task-item">
            <Checkbox>{todo.text}</Checkbox>
            <div className="priority-indicator">{priorityIndicator(todo.priority)}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ToDoList;