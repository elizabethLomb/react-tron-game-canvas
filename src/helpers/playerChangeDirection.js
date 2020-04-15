import sumCoordinates from "./sumCoordinates";

export default function playerChangeDirection(current, next) {
  const result = sumCoordinates(current, next)

  return Object.keys(result).filter(coordinate => result[coordinate] !== 0).length > 0;
}