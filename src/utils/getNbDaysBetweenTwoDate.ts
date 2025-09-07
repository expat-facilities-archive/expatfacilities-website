export const getNbDaysBetweenTwoDate = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return diff / (1000 * 60 * 60 * 24);
};
