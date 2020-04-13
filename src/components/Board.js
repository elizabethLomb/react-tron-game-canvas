import React, { useEffect, useRef } from 'react';
import { UNIT, BOARD_SIZE } from '../constants/board'

const Board = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath(); //start to drawing
    context.strokeStyle = '#08607352'
    for (let i = UNIT * 2; i <= BOARD_SIZE; i += UNIT * 2) {
      context.moveTo(i, 0);
      context.lineTo(i, BOARD_SIZE)
    }
    for (let i = UNIT * 2; i <= BOARD_SIZE; i += UNIT * 2) {
      context.moveTo(0, i);
      context.lineTo(BOARD_SIZE, i)
    }
    context.stroke(); //draw
    context.closePath(); //stop drawing
  }, []);

  return <canvas ref={canvasRef} width={BOARD_SIZE} height={BOARD_SIZE} className="board"/>
}

export default Board;