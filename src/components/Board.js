import React, { useEffect, useRef } from 'react';
import { UNIT, BOARD_SIZE } from '../constants/board'
import { GAME_READY } from '../constants/gameStatus';

const Board = ({ players, gameStatus }) => {
  const canvasRef = useRef();

  useEffect(function() {
    if(gameStatus === GAME_READY) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE) //clear board
  
      context.beginPath(); //start to drawing
      context.strokeStyle = '#08607352';
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
    }
  }, [gameStatus]);

  useEffect(function() {
    const context = canvasRef.current.getContext('2d');

    players.forEach(player => {
      context.fillStyle = player.color;
      context.fillRect(player.position.x, player.position.y, UNIT, UNIT)
    });
    
  }, [players]);

  return (
    <>
      <canvas ref={canvasRef} id="board" width={BOARD_SIZE} height={BOARD_SIZE} className="board"/>
      <div className="instructions">
        {players.map(player => (
          <div 
            className="intructions__player"
            style={{ color: player.color }}
            key={`player--${player.id}`}>
              {`${player.id}: ${player.instructions}`}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;