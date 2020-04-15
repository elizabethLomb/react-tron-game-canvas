import React, { useReducer, useEffect } from 'react';
import Board from './components/Board';
import { PLAYER_ONE, PLAYER_TWO } from './constants/players';
import useInterval from './hooks/useInterval';
import sumCoordinates from './helpers/sumCoordinates';
import playerChangeDirection from './helpers/playerChangeDirection';
import getPlayableCells from './helpers/getPlayableCells';
import { BOARD_SIZE, UNIT } from './constants/board';
import getCellKey from './helpers/getCellKey';

const players = [
  PLAYER_ONE,
  PLAYER_TWO
];

const initialState = {
  players,
  playableCells: getPlayableCells(
    BOARD_SIZE,
    UNIT,
    players.map(player => getCellKey(player.position.x, player.position.y))
  )
}

function updateGame(game, action) {

  if(action.type === 'move') {
    const newPlayers = game.players.map(player =>  ({
      ...player,
      position: sumCoordinates(player.position, player.direction)
    }));

    //collitions
    const checkCollition = newPlayers.map(player => {
      const myCellKey = getCellKey(player.position.x, player.position.y)

      return {
        ...player,
        hasDied:
          !game.playableCells.includes(myCellKey) ||
          newPlayers
            .filter(p => p.id !== player.id)
            .map(p => getCellKey(p.position.x, p.position.y))
            .includes(myCellKey)
      }
    });

    const ocupiedCells = game.players.map(player => getCellKey(player.position.x, player.position.y));
    const playableCells = game.playableCells.filter(cell => !ocupiedCells.includes(cell))

    return {
      players: checkCollition, //return players if not collition
      playableCells: playableCells //return avalible cells
    }
  }

  if(action.type === 'changeDirection') {
    const newPlayers = game.players.map(player => ({
      ...player,
      direction:
        player.keys[action.key] &&
        playerChangeDirection(player.direction, player.keys[action.key])
        ? player.keys[action.key]
        : player.direction
    }));

    return {
      players: newPlayers,
      playableCells: game.playableCells
    }
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  const players = game.players;
  const diedPlayers = players.filter(p => p.hasDied)

  if(diedPlayers.length > 0) console.log(diedPlayers)
  
  useInterval(() => {
    gameDispatch({ type: 'move' })
  }, diedPlayers.length > 0 ? null : 100) //hasDied == true, game stops

  //keyboard listener
  useEffect(function() {
    function handleKeyPress(event) {
      const key = `${event.keyCode}`;
      gameDispatch({ type: 'changeDirection', key });
    }

    document.addEventListener('keydown', handleKeyPress);

    return function cleanUp() {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  return (
    <Board players={game.players}/>
  );
}

export default App;
