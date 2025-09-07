export const reverseDate = (date: any): string => {
  const a = date
    .split("-")
    .reverse()
    .reduce((p: string, c: string) => p + "/" + c);
  return a;
};
