import React from 'react';
import Button from './UI/Button';

const Result = ({ result, onClick }) => (
  <div className="result_info">
    <h2>{result}</h2>
    <Button onClick={onClick}>
      Play Again!
    </Button>
  </div>
)

export default Result;