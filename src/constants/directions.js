import { UNIT } from "./board";

export const DIRECTIONS = {
  LEFT: { x: -UNIT, y: 0 },
  RIGHT: { x: UNIT, y: 0 },
  UP: { x: 0, y: -UNIT },
  DOWN: { x: 0, y: UNIT }
}