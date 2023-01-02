/* eslint-disable react/display-name */
import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { maskValues, normalizeValue } from './functions/helpers';
import { ICurrencyControlProps } from './types/CurrencyControl';

export const CurrencyControl = forwardRef<HTMLInputElement, ICurrencyControlProps>(
  (
    {
      children,
      value,
      defaultValue,
      shouldCutSymbol = false,
      currency = 'BRL',
      max,
      autoSelect,
      autoReset,
      onChangeValue,
      onBlur,
      onFocus,
      onKeyPress,
      ...otherProps
    },
    ref,
  ) => {
    const [maskedValue, setMaskedValue] = useState<number | string>('0');

    const updateValues = (originalValue: string | number) => {
      const [calculatedValue, calculatedMaskedValue] = maskValues(originalValue, currency, shouldCutSymbol);

      if (!max || calculatedValue <= max) {
        setMaskedValue(calculatedMaskedValue);

        return [calculatedValue, calculatedMaskedValue];
      }
      return [normalizeValue(maskedValue), maskedValue];
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const [originalValue, maskedValue] = updateValues(event.target.value);

      if (maskedValue) {
        onChangeValue(event, originalValue, maskedValue);
      }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
      const [originalValue, maskedValue] = updateValues(event.target.value);

      if (autoReset) {
        maskValues(0, currency, shouldCutSymbol);
      }

      if (maskedValue && onBlur) {
        onBlur(event, originalValue, maskedValue);
      }
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
      if (autoSelect) {
        event.target.select();
      }

      const [originalValue, maskedValue] = updateValues(event.target.value);

      if (maskedValue && onFocus) {
        onFocus(event, originalValue, maskedValue);
      }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) =>
      onKeyPress && onKeyPress(event, event.key, event.key);

    useEffect(() => {
      const currentValue = value || defaultValue || 0;
      const [, maskedValue] = maskValues(currentValue, currency, shouldCutSymbol);

      setMaskedValue(maskedValue);
    }, [currency, defaultValue, shouldCutSymbol, value]);

    return children({
      ...otherProps,
      ref,
      value: maskedValue,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyUp: handleKeyUp,
    });
  },
);

export { ICurrencyControlProps } from './types/CurrencyControl';
