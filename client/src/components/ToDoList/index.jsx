import React, { useState } from "react";
import { List, Checkbox, Modal, Button, Input, Card } from "antd";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Feed the cats", grayedOut: false },
    { id: 2, text: "Wash the Dishes", grayedOut: false },
    { id: 3, text: "Do Laundry", grayedOut: false },
  ]);
  const [visible, setVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
        grayedOut: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== idToDelete);
    setTodos(updatedTodos);
    setVisible(false);
  };

  const handleKeepOnList = () => {
    const updatedItems = todos.map((todo) =>
      todo.id === idToDelete ? { ...todo, grayedOut: true } : todo
    );
    setTodos(updatedItems);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheckboxChange = (id) => {
    setIdToDelete(id);
    setVisible(true);
  };

  return (
    <div
      className="todo-list-container"
      style={{
        backgroundColor: "#E8DDB5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <p></p>
      <div className="input-container">
        <Input
          placeholder="Add new item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
          className="add-input"
        />
      </div>
      <List
  dataSource={todos}
  renderItem={(item) => (
    <List.Item
      style={{
        backgroundColor: item.grayedOut ? '#f0f0f0' : (item.checked ? '#f4bd96' : 'transparent')
      }}
    >
      <Checkbox
        onChange={() => handleCheckboxChange(item.id)}
        style={{ textDecoration: item.grayedOut ? 'line-through' : 'none', color: '#615a58' }}
        className="checkbox"
        checked={item.grayedOut}
      >
        {item.text}
      </Checkbox>
    </List.Item>
  )}
  className="list"
/>


      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <div style={{ textAlign: "center" }}>
            <Button
              key="keepOnList"
              onClick={handleKeepOnList}
              className="keep-on-list"
            >
              Keep on List
            </Button>
            ,
            <Button
              key="delete"
              type="danger"
              onClick={handleDelete}
              className="delete"
            >
              Delete
            </Button>
            ,
          </div>,
        ]}
        className="modal"
      >
        <p style={{ textAlign: "center" }}>Do you want to delete this item?</p>
      </Modal>
    </div>
  );
};

export default TodoList;
