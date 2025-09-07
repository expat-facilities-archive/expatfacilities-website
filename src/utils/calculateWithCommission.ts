export const calculateWithCommission = (
  price: number,
  commission: number
): number => {
  return (price * commission) / 100 + price;
};
