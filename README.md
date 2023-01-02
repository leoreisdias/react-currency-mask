# React Input Currency

[![NPM](https://img.shields.io/npm/v/react-currency-control)](https://www.npmjs.com/package/react-currency-control)
[![npm](https://img.shields.io/npm/l/react-currency-control)](https://github.com/leoreisdias/react-currency-control/blob/main/LICENSE)

## Description

[react-currency-control](https://github.com/leoreisdias/react-currency-control.git) is a lib to help you mask currencies while the user types the values. _Supports BRL currency_

## Installation

```bash
$ yarn add react-currency-control

# or with npm

$ npm install react-currency-control --save
```

## Using react-currency-control

First, you need to import the <b>CurrencyControl</b> component. It receives any kind of input in order to give you control of styling and other third party libs.<br />
For example, you can pass inside the CurrencyControl a Chakra UI Input, MUI Input, your own styled input and so on.

- It also supports usage along <b>React Hook Form</b>;
  - React Hook Form Controller is recommended for better control;

---

### CurrencyControl

```js
<CurrencyControl
  onChangeValue={(event, originalValue, maskedValue) => {
    console.log(event, originalValue, maskedValue);
  }}
>
  (props) => <input {...props} />
</CurrencyControl>
```

#### Parameters

`children`
Required, must be a function returning a Input Element. You must pass the **props** of the function to your Input Element.

`onChangeValue`
Required, function that triggers after the value of input changes. It returns the Input Event, original value and masked value.

`onBlur`
Optional, function that triggers after blur. It returns the Input Event, original value and masked value.

`onFocus`
Optional, function that triggers after focused. It returns the Input Event, original value and masked value.

`onKeyPress`
Optional, function that triggers after any key press. It returns the Keyboard Event, original value and masked value.

`defaultValue`
Optional, default value of the Input.

`value`
Optional, value of the input if you want to control it.

`max`
Optional, max value permitted.

`currency`
Optional, currency you want to use as mask. Default is BRL.

`shouldCutSymbol`
Optional, boolean to control the currency symbol display.

`autoSelect`
Optional, if you want to select the value of input when clicking it.

`autoReset`
Optional, if you want to reset the value after blur.

### Example

```js
import { CurrencyControl } from 'react-currency-control';

const MyComponent = () => {
  return (
    <CurrencyControl
      onChangeValue={(event, originalValue, maskedValue) => {
        console.log(event, originalValue, maskedValue);
      }}
    >
      (props) => <input {...props} />
    </CurrencyControl>
  );
};
```

### Example output

...

---

## License

react-currency-control is [MIT licensed](LICENSE).

---

## Thank you and be free to contribute.
