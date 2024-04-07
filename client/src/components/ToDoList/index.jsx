import React, { useEffect, useState } from 'react';
import { List, Checkbox, Modal, Button, Input, Card } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { QUERY_TODOS } from '../../utils/queries';
import { ADD_TODO, REMOVE_TODO, SET_COMPLETED } from '../../utils/mutations';

const TodoList = () => {
  const token = Auth.getProfile();

  const [todos, setTodos] = useState();
  const [, forceUpdate] = useState(); // used to force a re-render when the todos array changes
  const [visible, setVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const { loading, data } = useQuery(QUERY_TODOS, {
    variables: { profileId: token.data._id },
  });
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [setCompleted] = useMutation(SET_COMPLETED);

  useEffect(() => {
    if (!loading && data) {
      setTodos(data.todos);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (!data) {
    return <div>Error!</div>;
  }

  const handleAdd = async () => {
    if (!inputValue) {
      return;
    }
    console.log(`Id: ${token.data._id}, Todo: ${inputValue}`);
    const { data: addedData } = await addTodo({
      variables: { profileId: token.data._id, todo: inputValue },
    });
    setInputValue('');
    setTodos([...addedData.addTodo.todos]);
  };

  const handleDelete = async () => {
    const { data } = await removeTodo({
      variables: { profileId: token.data._id, todoId: idToDelete },
    });

    setVisible(false);
    setTodos([...data.removeTodo.todos]);
  };

  // need to update the todo item to isCompleted: true
  const handleKeepOnList = async () => {
    const { data } = await setCompleted({
      variables: { profileId: token.data._id, todoId: idToDelete },
    });
    setVisible(false);
    setTodos([...data.setCompleted.todos]);
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
     {/* Title for the To-Do List */}
     <h2 style={{ textAlign: "center", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'", fontSize: "24px", fontWeight: 600, color: "#615a58" }}>To Do List</h2>
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
        renderItem={
          todos ? (
            (item) => (
              <List.Item
                key={item._id}
                style={{
                  backgroundColor: item.isCompleted
                    ? '#f0f0f0'
                    : item.checked
                    ? '#f4bd96'
                    : 'transparent',
                }}
              >
                <Checkbox
                  onChange={() => handleCheckboxChange(item._id)}
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
          <div key="footerButtons" style={{ textAlign: 'center' }}>
            <Button
              key="keepOnList"
              onClick={handleKeepOnList}
              className="keep-on-list"
            >
              Keep on List
            </Button>
            <Button
              key="delete"
              type="danger"
              onClick={handleDelete}
              className="delete"
            >
              Delete
            </Button>
          </div>,
        ]}
        className="modal"
        closeIcon={
          <div style={{ position: 'absolute', top: '4px', right: '10px' }}>X</div>
        }
      >
        <p style={{ textAlign: 'center' }}>Do you want to delete this item?</p>
      </Modal>
    </div>
  );
};

export default TodoList;
