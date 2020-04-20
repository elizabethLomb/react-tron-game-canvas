import React from 'react';
import Button from './UI/Button';

const Start = ({ onCLick }) => (
  <div className="play_btn">
    <Button onClick={onCLick}>Start</Button>
  </div>
)

export default Start;

