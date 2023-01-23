const SYMBOL_LENGTH = 3;

export const formatCurrency = (value: number, currencyType = 'BRL', hideSymbol = false) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyType,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedValue = formatter.format(value);

  return formattedValue.slice(hideSymbol ? SYMBOL_LENGTH : 0);
};
