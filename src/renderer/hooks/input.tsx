import React, { ChangeEvent } from 'react';

type DynamicObject = {
  [key: string]: any; // Keys are strings, and values are also any
};

const useInput = ({ defaultValue, rules }: DynamicObject) => {
  const [input, setInput] = React.useState(defaultValue);
  const [errors, setErrors] = React.useState<DynamicObject>({});
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    val: any = null,
  ) => {
    const _errors = {};
    let name = e.target.name;
    let value = e.target.value;
    // debugger;
    if (val) {
      value = val;
    }
    console.log(input);
    if (rules[name]) {
      var error = rules[name](value);
    }
    if (rules[name] && error) {
      const _errors = { ...errors, [name]: error };
      setErrors(_errors);
    } else {
      setInput({ ...input, [name]: value });
      setErrors(_errors);
    }
  };
  return { input, setInput, onChange, errors, setErrors };
};

export default useInput;
