import { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement } from 'react';

export interface ICurrencyMaskProps {
  InputElement?: ReactElement;
  defaultValue?: number;
  value?: number;
  max?: number;
  currency?: string;
  hideSymbol?: boolean;
  autoSelect?: boolean;
  autoReset?: boolean;
  onChangeValue: (
    event: ChangeEvent<HTMLInputElement>,
    originalValue: number | string,
    maskedValue: number | string,
  ) => void;
  onBlur?: (
    event: FocusEvent<HTMLInputElement, Element>,
    originalValue: number | string,
    maskedValue: number | string,
  ) => void;
  onFocus?: (
    event: FocusEvent<HTMLInputElement, Element>,
    originalValue: number | string,
    maskedValue: number | string,
  ) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>, originalValue: number | string, maskedValue: string) => void;
}
