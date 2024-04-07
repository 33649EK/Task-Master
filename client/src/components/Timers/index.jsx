import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Typography, Divider, Modal, message, Select } from "antd";
import { ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import chimeSound from "../../assets/chime.mp3";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import { useQuery } from '@apollo/client';
import { QUERY_TODOS } from '../../utils/queries'; 
import Auth from '../../utils/auth';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AnimatedBackground = styled.div`
  background: linear-gradient(-45deg, #155725, #153b57, #9e9c1b);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const TimerContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -12px;
`;

const SmallButton = styled(Button)`
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Timers = () => {
  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [displayedTask, setDisplayedTask] = useState("");
  const [selectedTaskText, setSelectedTaskText] = useState(""); 

  const [isTaskEntered, setIsTaskEntered] = useState(false); 
  const chimeRef = useRef(null);
  const token = Auth.getProfile();
  const profileId = token.data._id;

  const { loading: loadingTasks, data: tasksData } = useQuery(QUERY_TODOS, {
    variables: { profileId: profileId },
  });

  // Function to handle selecting a task from the dropdown and hiding the drop doown once something is selected
  const handleSelectTask = (value) => {
    const selectedTask = tasksData.todos.find(task => task._id === value);
    setSelectedTaskText(selectedTask.text); 
    setIsTaskEntered(true); // a task is selected
    setShowDropdown(false); // Hide dropdown
  };

  const [showDropdown, setShowDropdown] = useState(true);

  const handleNewTaskClick = () => {
    setShowDropdown(true);  // Show the dropdown
    setSelectedTaskText(""); 
    setIsTaskEntered(false); 
  };


  const showBreakModal = (duration) => {
    setTimeLeft(duration * 60);
    setTimerActive(false);
    setIsBreakModalVisible(true); // Shows the modal with the countdown timer
  };

  const handleBreakTimerComplete = () => {
    setIsBreakModalVisible(false); // Closes modal when timer is done
    setKey((prevKey) => prevKey + 1);
    message.info("Break is over, back to work!");
  };

  // Start the timer with specific minutes
  const startTimer = (duration) => {
    setTimeLeft(duration * 60);
    setTimerActive(true);
    setControlsVisible(true);
  };

  // Pause the timer
  const togglePause = () => {
    setTimerActive(!timerActive);
  };

  // Reset the timer
  const resetTimer = () => {
    setTimeLeft(0);
    setTimerActive(false);
    setControlsVisible(false);
  };

  // Delete the task
  const deleteTask = () => {
    setDisplayedTask("");
  };

  // Convert seconds into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Update the timer every second
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      chimeRef.current.play();
      message.success("Time is up, take a break");
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleInputEnter = () => {
    setDisplayedTask(currentTask);
    setCurrentTask("");
    setIsTaskEntered(true); // Set the state to indicate that the task is entered
  };

  return (
    <>
      <Card className="timer-container">
        <Title
          level={2}
          style={{ textAlign: "center", fontSize: "24px", color: "#615a58" }}
        >
          Timer
          </Title>
        <Divider />
        {isTaskEntered && (
        <>
          <Paragraph style={{ textAlign: "center", fontWeight: "bold" }}>
            Currently working on: {selectedTaskText}
          </Paragraph>
          <Button onClick={handleNewTaskClick} type="default" style={{ display: "block", margin: "10px auto", backgroundColor: "#B2C9AB" }}>
            <DeleteOutlined /> Select new task
          </Button>
        </>
      )}
        <ClockCircleOutlined
          style={{
            fontSize: "130px",
            color: "#615a58",
            display: "block",
            margin: "auto",
            bottomMargin: "10px",
          }}
          />
         {/* Task selection dropdown */}
         {!isTaskEntered && (
        <>
          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : (
            <Select
              showSearch
              style={{ width: '100%', margin: '10px' }}
              placeholder="Select a task to work on"
              onChange={handleSelectTask}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {tasksData && tasksData.todos.map(task => (
                <Option key={task._id} value={task._id}>{task.text}</Option>
              ))}
            </Select>
          )}
        </>
      )}
    
        <Title level={3} style={{ textAlign: "center", color: "#615a58" }}>
          {formatTime(timeLeft)}
        </Title>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
         
          <Button className="timer-button" onClick={() => startTimer(25)}>
            25 min
          </Button>
          <Button className="timer-button" onClick={() => startTimer(50)}>
            50 min
          </Button>
          <Button
            className="timer-button short-break"
            onClick={() => showBreakModal(5)}
          >
            Short break
          </Button>
          <Button
            className="timer-button long-break"
            onClick={() => showBreakModal(10)}
          >
            Long break
          </Button>
          <audio ref={chimeRef} src={chimeSound} preload="auto"></audio>
          {controlsVisible && (
            <>
              <Button className="timer-button" onClick={togglePause}>
                {timerActive ? "Pause" : "Resume"}
              </Button>
              <Button className="timer-button" onClick={resetTimer}>
                Reset
              </Button>
            </>
          )}
        </div>
      </Card>
      {/* Modal for Long Break Timer */}
      <Modal
        title={
          <div
            style={{ textAlign: "center", fontSize: "26px", color: "#615a58" }}
          >
            Great work! Time for a break!
          </div>
        }
        visible={isBreakModalVisible}
        footer={null}
        onCancel={() => setIsBreakModalVisible(false)}
        centered
        style={{ top: 0 }}
        width="100vw"
        height="100vh"
        bodyStyle={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <AnimatedBackground>
          <TimerContent>
            <CountdownCircleTimer
              key={key}
              isPlaying={isBreakModalVisible}
              duration={timeLeft}
              colors={[["#00a2ae"]]}
              onComplete={handleBreakTimerComplete}
              size={550} 
            >
              {({ remainingTime }) => (
                <>
                  <Title
                    style={{
                      position: "absolute",
                      color: "#dcdfdd",
                      top: "65%",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {formatTime(remainingTime)}
                  </Title>
                  <div
                    style={{
                      position: "absolute",
                      fontWeight: "600",
                      fontSize: "40px",
                      color: "white",
                      top: "25%",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Breathe In, Breathe Out
                  </div>
                </>
              )}
            </CountdownCircleTimer>
          </TimerContent>
        </AnimatedBackground>
      </Modal>
    </>
  );
};

export default Timers;
