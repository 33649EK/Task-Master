import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Typography, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Timers = () => {
  const [timeLeft, setTimeLeft] = useState(0); 
  const [timerActive, setTimerActive] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

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

  // Convert seconds into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
      message.success("Time is up, take a break");
    }
    return () => clearInterval(interval); 
  }, [timerActive, timeLeft]);

  return (
    <Card className="timer-container">
      <Title level={2} style={{ textAlign: 'center', fontSize:'24px', color:'#615a58' }}>Timer</Title>
      <Divider />
      <Input placeholder="Current task" style={{ marginBottom: '10px' }} />
      <ClockCircleOutlined style={{ fontSize: '50px', color:'#615a58', display: 'block', margin: 'auto' }} />
      <Title level={3} style={{ textAlign: 'center', color:'#615a58' }}>{formatTime(timeLeft)}</Title>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button className="timer-button" onClick={() => startTimer(25)}>25 min</Button>
        <Button className="timer-button" onClick={() => startTimer(50)}>50 min</Button>
        <Button className="timer-button short-break" onClick={() => startTimer(5)}>Short break</Button>
        <Button className="timer-button long-break" onClick={() => startTimer(10)}>Long break</Button>
        {controlsVisible && (
          <>
            <Button className="timer-button" onClick={togglePause}>{timerActive ? 'Pause' : 'Resume'}</Button>
            <Button className="timer-button" onClick={resetTimer}>Reset</Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default Timers;