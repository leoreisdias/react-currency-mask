# React Currency Mask

[![NPM](https://img.shields.io/npm/v/react-currency-mask)](https://www.npmjs.com/package/react-currency-mask)
[![npm](https://img.shields.io/npm/l/react-currency-mask)](https://github.com/leoreisdias/react-currency-mask/blob/main/LICENSE)

## Description

[react-currency-mask](https://github.com/leoreisdias/react-currency-mask.git) is a lib to help you mask currencies while the user types the values. _Supports BRL currency_

## Installation

```bash
$ yarn add react-currency-mask

# or with npm

$ npm install react-currency-mask --save
```

## Using react-currency-mask

First, you need to import the <b>CurrencyInput</b> component. It receives any kind of input in order to give you control of styling and other third party libs.<br />
For example, you can pass inside the CurrencyInput a Chakra UI Input, MUI Input, your own styled input and so on.

- It also supports usage along <b>React Hook Form</b>;
  - React Hook Form Controller is recommended for better control (example below).

---

## CurrencyInput Component

```js
<CurrencyInput
  onChangeValue={(event, originalValue, maskedValue) => {
    console.log(event, originalValue, maskedValue);
  }}
/>
```

## Parameters

`onChangeValue`
Required, function that triggers after the value of input changes. It returns the Input Event, original value and masked value.

`InputElement`
Optional, must be a React Element. It can be from a Third Party library (such as MUI, Chakra UI, or any other...) or your own custom Input.

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

`hideSymbol`
Optional, boolean to control the currency symbol display.

`autoSelect`
Optional, if you want to select the value of input when clicking it.

`autoReset`
Optional, if you want to reset the value after blur.

---

## Examples

### Default Input

```js
import { CurrencyInput } from 'react-currency-mask';

const MyComponent = () => {
  return (
    <CurrencyInput
      onChangeValue={(event, originalValue, maskedValue) => {
        console.log(event, originalValue, maskedValue);
      }}
    />
  );
};
```

**Example output**

![Output example](https://i.imgur.com/oajugCZ.png)

### Using a custom input (Third Party or your own)

```js
import { CurrencyInput } from 'react-currency-mask';
import { TextField } from '@mui/material';

const MyComponent = () => {
  return (
    <CurrencyInput
      onChangeValue={(event, originalValue, maskedValue) => {
        console.log(event, originalValue, maskedValue);
      }}
      InputElement={<TextField label="Custom Input" size="small" />}
    />
  );
};
```

<u>\*This example uses a MUI TextField</u>

**Example output**

![Output example](https://i.imgur.com/YriLExI.png)

### Integrating with React-Hook-Form Controller

```js
import { CurrencyInput } from 'react-currency-mask';
import { Controller, useFormContext } from 'react-hook-form';

type MyComponentProps = {
  name: string,
};

const MyComponent = ({ name }: MyComponentProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CurrencyInput
          value={field.value}
          onChangeValue={(_, value) => {
            field.onChange(value);
          }}
          InputElement={<MyCustomInput />}
        />
      )}
    />
  );
};
```

<u>\*Input Element is optional, use it just if you want a custom input</u>

---

## License

react-currency-mask is [MIT licensed](LICENSE).

---

## Thank you and be free to contribute.
