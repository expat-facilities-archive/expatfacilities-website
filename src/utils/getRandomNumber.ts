export const getRandomNumber = (min: number, max: number): string => {
  return (Math.random() * (max - min) + min).toFixed(0);
};
