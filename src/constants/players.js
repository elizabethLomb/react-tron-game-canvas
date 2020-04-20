import { UNIT } from './board';
import { DIRECTIONS } from './directions';

export const PLAYER_ONE = {
  color: '#ffdb00',
  id: 1,
  keys: { 
    38: DIRECTIONS.UP,
    39: DIRECTIONS.RIGHT,
    40: DIRECTIONS.DOWN,
    37: DIRECTIONS.LEFT
  },
  direction: DIRECTIONS.RIGHT,
  position: {
    x: UNIT * 6,
    y: UNIT * 6
  },
  hasDied: false,
  instructions: 'Flechas de dirección'
}

export const PLAYER_TWO = {
  color: '#2392ff',
  id: 2,
  keys: {
    87: DIRECTIONS.UP,
    68: DIRECTIONS.RIGHT,
    83: DIRECTIONS.DOWN,
    65: DIRECTIONS.LEFT
  },
  direction: DIRECTIONS.LEFT,
  position: {
    x: UNIT * 50,
    y: UNIT * 50
  },
  hasDied: false,
  instructions:'AWSD'
}