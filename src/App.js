import React, { useReducer } from 'react';
import Board from './components/Board';
import { PLAYER_ONE, PLAYER_TWO } from './constants/players';
import useInterval from './hooks/useInterval';

const initialState = [
  PLAYER_ONE,
  PLAYER_TWO
];

function updateGame(state, action) {
  if(action.type === 'move') {
    //update players state
    return state
  }
}

function App() {
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  useInterval(() => {
    gameDispatch({ type: 'move' })
  }, 1000 / 60)

  return (
    <Board />
  );
}

export default App;
