import { KEYBOARD_ONE, KEYBOARD_TWO } from './keyboard';
import { UNIT } from './board';

export const PLAYER_ONE = {
  COLOR: '#ffdb00',
  ID: 1,
  KEYS: { KEYBOARD_ONE },
  direction: 'right',
  position: {
    x: UNIT * 6,
    y: UNIT * 6
  }
}

export const PLAYER_TWO = {
  COLOR: '#2392ff',
  ID: 2,
  KEYS: { KEYBOARD_TWO },
  direction: 'left',
  position: {
    x: UNIT * 43,
    y: UNIT * 43
  }
}