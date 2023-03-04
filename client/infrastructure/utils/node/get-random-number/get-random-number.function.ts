export const getRandomNumber = (min: number = 0, max: number = 1) => {
  const randomValue = Math.random() * (max - min) + min;

  return Math.round(randomValue);
};
