import React, { ChangeEvent } from 'react';

type DynamicObject = {
  [key: string]: any; // Keys are strings, and values are also any
};

const useInput = (defaultValue: DynamicObject) => {
  const [input, setInput] = React.useState(defaultValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>, val: any = null) => {
    let name = e.target.name;
    let value = e.target.value;
    if (val) {
      value = val;
    }
    console.log(input)
    setInput({ ...input, [name]: value });
  };
  return { input, setInput, onChange };
};

export default useInput;
