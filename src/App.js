import React, { useReducer, useEffect } from 'react';
import Board from './components/Board';
import { PLAYER_ONE, PLAYER_TWO } from './constants/players';
import useInterval from './hooks/useInterval';
import sumCoordinates from './helpers/sumCoordinates';
import playerChangeDirection from './helpers/playerChangeDirection';
import getPlayableCells from './helpers/getPlayableCells';
import { BOARD_SIZE, UNIT } from './constants/board';
import getCellKey from './helpers/getCellKey';
import { GAME_READY, GAME_PLAYING, GAME_OVER } from './constants/gameStatus';
import Start from './components/Start';
import Result from './components/Result';

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
  ),
  gameStatus: GAME_READY
}

function updateGame(game, action) {

  if(action.type === 'start') {
    return {...initialState, gameStatus: GAME_PLAYING }
  }

  if(action.type === 'restart') {
    return {...initialState, gameStatus: GAME_READY }
  }

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

    const ocupiedCells = game.players.map(player => getCellKey(player.position.x, player.position.y ));
    const playableCells = game.playableCells.filter(cell => !ocupiedCells.includes(cell))

    return {
      players: checkCollition, //return players if not collition
      playableCells: playableCells, //return avalible cells
      gameStatus: checkCollition.filter(player => player.hasDied).length === 0 ? GAME_PLAYING : GAME_OVER
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
      playableCells: game.playableCells,
      gameStatus: game.gameStatus
    }
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);
  let result = null

  const players = game.players;
  const diedPlayers = players.filter(p => p.hasDied)

  if(diedPlayers.length > 0) console.log(diedPlayers)
  
  useInterval(() => {
    gameDispatch({ type: 'move' })
  }, game.gameStatus !== GAME_PLAYING ? null : 100);
  //diedPlayers.length > 0 ? null : 100)

  //keyboard listener
  useEffect(function() {
    function handleKeyPress(event) {
      const key = `${event.keyCode}`;

      if(key === '13') {
        if(game.gameStatus === GAME_READY) handleStart();
        if(game.gameStatus === GAME_OVER) handleRestart();
      }
      gameDispatch({ type: 'changeDirection', key })
    } 

    document.addEventListener('keydown', handleKeyPress);

    return function cleanUp() {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [game.gameStatus]);

  const handleStart = () => gameDispatch({ type: 'start' })
  const handleRestart = () => gameDispatch({ type: 'restart' })

  if(game.gameStatus === GAME_OVER){
    const winningPlayers = game.players.filter(player => !player.hasDied)
    if(winningPlayers.length === 0) result = 'TIE'

    result = `The winner is ${winningPlayers.map(player => `Player ${player.id}`).join(',')}`
  }

  return (
    <>
    <Board players={game.players} gameStatus={game.gameStatus}/>
    {game.gameStatus === GAME_OVER && <Result onClick={handleRestart} result={result} />}
    {game.gameStatus === GAME_READY && <Start onCLick={handleStart}/>}
    </>
  );
}

export default App;
