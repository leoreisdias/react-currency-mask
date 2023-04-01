import { MAXIMUM_FRACTION_DIGITS } from '../constants/decimals';
import { formatCurrency } from './format';

export const clearNumber = (number: any) => {
  if (typeof number === 'number') {
    return number;
  }

  // strips everything that is not a number (positive or negative)
  return Number(number.toString().replace(/[^0-9-]/g, ''));
};

export const normalizeValue = (number: string | number) => {
  let safeNumber = number;

  if (typeof number === 'string') {
    safeNumber = clearNumber(number);

    if (safeNumber % 1 !== 0) {
      safeNumber = safeNumber.toFixed(MAXIMUM_FRACTION_DIGITS);
    }
  } else {
    // all input numbers must be a float point (for the cents portion). This is a fallback in case of integer ones.
    safeNumber = Number.isInteger(number)
      ? Number(number) * 10 ** MAXIMUM_FRACTION_DIGITS
      : number.toFixed(MAXIMUM_FRACTION_DIGITS);
  }
  // divide it by 10 power the maximum fraction digits.
  return clearNumber(safeNumber) / 10 ** MAXIMUM_FRACTION_DIGITS;
};

export const maskValues = (
  locale: string,
  inputFieldValue: string | number | undefined,
  currency: string,
  shouldCutSymbol: boolean,
) => {
  if (!inputFieldValue) return [0, ''];

  const value = normalizeValue(inputFieldValue);
  const maskedValue = formatCurrency(locale, value, currency, shouldCutSymbol);

  return [value, maskedValue];
};
