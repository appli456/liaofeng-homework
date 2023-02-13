function randomNumber(min: number, max: number): number {
  if (min > max) {
    return 0;
  }

  const random = Math.random();
  const range = max - min;

  return min + Math.ceil(random * range);
}

export {
  randomNumber
}
