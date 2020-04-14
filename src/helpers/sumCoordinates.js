export default function sumCoordinates(a, b) {
  return Object.keys(a).reduce(
    (positionObject, coordinate) => ({
      ...positionObject,
      [coordinate]: a[coordinate] + b[coordinate]
    }),
    {} //empty initial object
  );
}
