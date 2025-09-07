export const calculateReduction = (
  originalPrice: number,
  reduction: number
): number => {
  return (originalPrice * reduction) / 100;
};
