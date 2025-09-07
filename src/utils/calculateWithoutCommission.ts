export const calculateWithoutCommission = (
  price: number,
  commission: number
): number => {
  return (price * commission) / 100;
};
