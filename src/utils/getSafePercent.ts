export const getSafePercent = (
  percent: number,
  max: number,
  min = 0
): number => {
  if (percent > max || percent < min || typeof percent !== "number") {
    throw new Error(
      `The value passed to percent or position needs to be a number between ${min} and ${max} (passed value: ${percent}).`
    );
  }
  return Math.min(100, Math.max(percent, 0));
};
