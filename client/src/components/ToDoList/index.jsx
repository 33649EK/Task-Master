import React, { useEffect, useState } from 'react';
import { List, Checkbox, Modal, Button, Input, Card } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { QUERY_TODOS } from '../../utils/queries';
import { ADD_TODO, REMOVE_TODO } from '../../utils/mutations';

const TodoList = () => {
  const token = Auth.getProfile();

  const [todos, setTodos] = useState([]);

  const [visible, setVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { loading, data } = useQuery(QUERY_TODOS, {
    variables: { profileId: token.data._id },
  })
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  useEffect(() => {
    if (!loading && data) {
      setTodos(data.todos);
      console.log(`Data: ${JSON.stringify(todos)}`);``
    }
  }, [data, loading]);


  if (loading) {
    return <div>Loading...</div>;
  } else if (!data) {
    return <div>Error!</div>;
  }

  const handleAdd = () => {
    if (!inputValue) {
      return;
    }
    console.log(`Id: ${token.data._id}, Todo: ${inputValue}`)
    const { data, error } = addTodo({
      variables: { profileId: token.data._id, todo: inputValue},
    });

    console.log(`Added: ${data}`);

    setInputValue('');
  };

  const handleDelete = () => {
    const { data } = removeTodo({
      variables: { _id: idToDelete },
    });
    console.log(`Deleted: ${data}`);
    setVisible(false);
  };

  const handleKeepOnList = () => {
    // const updatedItems = todos.map((todo) =>
    //   todo.id === idToDelete ? { ...todo, isCompleted: true } : todo
    // );
    // setTodos(updatedItems);
    // setVisible(false);
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
        backgroundColor: '#E8DDB5',
        minHeight: '100vh',
        padding: '20px',
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
        dataSource={data.todos}
        renderItem={
          data.todos.length > 0 ? (
            (item) => (
              <List.Item
                key={item.id}
                style={{
                  backgroundColor: item.isCompleted
                    ? '#f0f0f0'
                    : item.checked
                    ? '#f4bd96'
                    : 'transparent',
                }}
              >
                <Checkbox
                  onChange={() => handleCheckboxChange(item.id)}
                  style={{
                    textDecoration: item.isCompleted ? 'line-through' : 'none',
                    color: '#615a58',
                  }}
                  className="checkbox"
                  checked={item.isCompleted}
                >
                  {item.text}
                </Checkbox>
              </List.Item>
            )
          ) : (
            <Card
              title="Welcome to your To-Do List"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <p>Click the input field above to add a new item to your list.</p>
            </Card>
          )
        }
        className="list"
      />

      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <div style={{ textAlign: 'center' }}>
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
        <p style={{ textAlign: 'center' }}>Do you want to delete this item?</p>
      </Modal>
    </div>
  );
};

export default TodoList;
