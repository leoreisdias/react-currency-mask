const SYMBOL_LENGTH = 3;

export const formatCurrency = (locale: string = 'pt-BR', value: number, currencyType = 'BRL', hideSymbol = false) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyType,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedValue = formatter.format(value);

  return formattedValue.slice(hideSymbol ? SYMBOL_LENGTH : 0);
};
