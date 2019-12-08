import { Vector3 } from 'three';

Math.getRandomArbitrary = (min, max, floor = false) => {
  let res;
  if (floor) {
    res = Math.floor(Math.random() * (max - min)) + min;
  } else {
    res = Math.random() * (max - min) + min;
  }

  return res;
};

export default () => {
  const length = 130;
  const ellipsesCount = 2 * Math.PI;
  let radius = 200;
  const circlePointsCoordinates = [];
  for (let i = 0; i < length; i += 1) {
    for (
      let j = 0;
      j < ellipsesCount;
      j += 0.01
    ) {
      const x = radius * Math.sin(j + Math.random() / 10);
      const y = radius * Math.cos(j + Math.random() / 10);
      const distance = Math.floor(Math.sqrt(x * x + y * y));
      circlePointsCoordinates.push(
        new Vector3(
          x + Math.getRandomArbitrary(-80, 80),
          y + Math.getRandomArbitrary(-80, 80),
          0,
          // Math.getRandomArbitrary(-length - i, length - i),
          // (Math.getRandomArbitrary(-i, i)
        )
      );
    }

    radius += 1.5;
  }
  return circlePointsCoordinates;
};
