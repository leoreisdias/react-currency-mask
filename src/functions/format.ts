export const formatCurrency = (locale: string = 'pt-BR', value: number, currencyType = 'BRL', hideSymbol = false) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyType,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  let formattedValue = formatter.format(value);

  if (hideSymbol) {
    const symbolParts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyType,
      currencyDisplay: 'symbol',
    }).formatToParts(0);

    const symbolPart = symbolParts.find((x) => x.type === 'currency');
    const symbol = symbolPart ? symbolPart.value : '';

    formattedValue = formattedValue.replace(symbol, '').trim();
    formattedValue = formattedValue.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    formattedValue = formattedValue.replace(/^-\s*/, '-');
  }

  return formattedValue;
};
