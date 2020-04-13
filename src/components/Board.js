import React, { useEffect, useRef } from 'react';

const unit = 15;
const boardSize = 900;

const Board = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath(); //
    context.strokeStyle = '#08607352'
    for (let i = unit * 2; i <= boardSize; i += unit * 2) {
      context.moveTo(i, 0);
      context.lineTo(i, boardSize)
    }
    for (let i = unit * 2; i <= boardSize; i += unit * 2) {
      context.moveTo(0, i);
      context.lineTo(boardSize, i)
    }
    context.stroke();
    context.closePath();
  }, []);

  return <canvas ref={canvasRef} width={boardSize} height={boardSize} className="board"/>
}

export default Board;