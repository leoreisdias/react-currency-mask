const SYMBOL_LENGTH = 3;

export const formatCurrency = (value: number, currencyName = 'BRL', shouldCutSymbol = false) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyName,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedValue = formatter.format(value);

  return formattedValue.slice(shouldCutSymbol ? SYMBOL_LENGTH : 0);
};
