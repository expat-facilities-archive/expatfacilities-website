type Options = {
  currency?: string;
  decimal?: boolean;
  separator?: string;
};

const DEFAULT_OPTIONS: Options = {
  currency: "€",
  decimal: true,
  separator: ",",
};

const _normalizeAmount = (amount: string | number): number | null => {
  if (!["number", "string"].includes(typeof amount) || amount === "") {
    return null;
  }
  const _amount = Number(amount);

  if (Number.isNaN(_amount) || (!Number.isFinite(_amount) && _amount !== 0)) {
    return null;
  }

  return _amount;
};

export const formatAmount = (
  amount: number | string,
  options: Options = DEFAULT_OPTIONS
): string => {
  const _amount = _normalizeAmount(amount);

  if (!options.currency) options.currency = DEFAULT_OPTIONS.currency;
  if (!options.decimal) options.decimal = DEFAULT_OPTIONS.decimal;
  if (!options.separator) options.separator = DEFAULT_OPTIONS.separator;

  if (_amount === null) {
    return `--.-- ${options.currency}`;
  }

  const formatted = _amount
    .toFixed(options.decimal ? 2 : 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, options?.separator || ",");

  if (!options.currency) {
    return formatted;
  }

  return `${formatted} ${options.currency}`;
};
