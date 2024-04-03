import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card, Typography, Divider, Modal, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import chimeSound from '../../assets/chime.mp3';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styled from 'styled-components';


const { Title, Paragraph } = Typography;
//from jadahs break page 
const AnimatedBackground = styled.div`
  background: linear-gradient(45deg, #ff7300, #fc0070, #00bcd4, #00ff99);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  height: 100%; /* Set to the height of the modal content area */
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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



const CenteredText = styled(Paragraph)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-size: 2rem;
  margin: 0;
  z-index: 10;
`;

const Timers = () => {
  const [isBreakModalVisible, setIsBreakModalVisible] = useState(false);
  const [key, setKey] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(0); 
  const [timerActive, setTimerActive] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const chimeRef = useRef(null);

  const showBreakModal = (duration) => {
    setTimeLeft(duration * 60); 
    setTimerActive(false);
    setIsBreakModalVisible(true); // Shows the modal with the countdown timer
  };

  const handleBreakTimerComplete = () => {
    setIsBreakModalVisible(false); // Closes modal when timer is done
    setKey(prevKey => prevKey + 1); 
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

//i dont think we need but not removing yet  -H
  // const handleShortBreakClick = () => {
  //   startTimer(5);
  //   window.location.href = "/break";
  // };


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
      chimeRef.current.play();
      message.success("Time is up, take a break");
    }
    return () => clearInterval(interval); 
  }, [timerActive, timeLeft]);

  return (
    <>
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
        <Button className="timer-button long-break" onClick={() => showBreakModal(10)}>Long break</Button>
        <audio ref={chimeRef} src={chimeSound} preload="auto"></audio>
        {controlsVisible && (
          <>
            <Button className="timer-button" onClick={togglePause}>{timerActive ? 'Pause' : 'Resume'}</Button>
            <Button className="timer-button" onClick={resetTimer}>Reset</Button>
          </>
        )}
      </div>
    </Card>
     {/* Modal for Long Break Timer */}
  <Modal
 title={<div style={{ textAlign: 'center', fontSize: '26px', color: '#615a58'}}>Great work! Time for a long break!</div>}
 visible={isBreakModalVisible}
 footer={null}
 onCancel={() => setIsBreakModalVisible(false)}
 centered
 style={{ top: 0 }}
 width="100vw"
 height="100vh"
 bodyStyle={{
   height: '100vh',
   overflowY: 'auto'
 }}
>
 <AnimatedBackground>
   <TimerContent>
     <CountdownCircleTimer
       key={key}
       isPlaying={isBreakModalVisible}
       duration={timeLeft}
       colors={[['#00a2ae']]}
       onComplete={handleBreakTimerComplete}
       size={350} // timer size
     >
       {({ remainingTime }) => (
         <>
           <Title style={{ position: 'absolute', color: '#dcdfdd', top: '65%' }}>
             {formatTime(remainingTime)}
           </Title>
           <CenteredText style={{ position: 'absolute', fontWeight: '600',color: 'white', top: '25%' }}>
             Breathe In, Breathe Out
           </CenteredText>
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