/* eslint-disable react/display-name */

import { ChangeEvent, cloneElement, FocusEvent, KeyboardEvent } from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { maskValues, normalizeValue } from './functions/helpers';
import { ICurrencyMaskProps } from './types/CurrencyMask';

export const CurrencyInput = forwardRef<HTMLInputElement, ICurrencyMaskProps>(
  (
    {
      InputElement,
      value,
      defaultValue,
      hideSymbol = false,
      currency = 'BRL',
      locale = 'pt-BR',
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
    const [maskedValue, setMaskedValue] = useState<number | string>(() => {
      if (!value) return '0'
  
      const [, calculatedMaskedValue] = maskValues(
        locale,
        value,
        currency,
        hideSymbol,
      )
  
      return calculatedMaskedValue
    })

    const updateValues = (originalValue: string | number) => {
      const [calculatedValue, calculatedMaskedValue] = maskValues(locale, originalValue, currency, hideSymbol);

      if (!max || calculatedValue <= max) {
        setMaskedValue(calculatedMaskedValue);

        return [calculatedValue, calculatedMaskedValue];
      }
      return [normalizeValue(maskedValue), maskedValue];
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const [originalValue, maskedValue] = updateValues(event.target.value);
      
      onChangeValue(event, originalValue, maskedValue);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
      const [originalValue, maskedValue] = updateValues(event.target.value);

      if (autoReset) {
        maskValues(locale, 0, currency, hideSymbol);
      }

      if (onBlur) {
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
      const currentValue = value || defaultValue || undefined;
      const [, maskedValue] = maskValues(locale, currentValue, currency, hideSymbol);

      setMaskedValue(maskedValue);
    }, [currency, defaultValue, hideSymbol, value]);

    if (!InputElement) {
      return (
        <input
          {...otherProps}
          ref={ref}
          value={maskedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyUp={handleKeyUp}
        />
      );
    }

    return cloneElement(InputElement, {
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

export { ICurrencyMaskProps } from './types/CurrencyMask';
