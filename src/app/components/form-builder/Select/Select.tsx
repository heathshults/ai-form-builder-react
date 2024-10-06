'use client'
import * as React from 'react';
import './Select.scss';


interface SelectProps {
  values: string
  onValueChange: ()=>void
  selectedValue: string
};


export const Select = ({ values, onValueChange, selectedValue, ...rest }: SelectProps) => {
  console.log('values', values)
  return (
    <select
      defaultValue={selectedValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    >
      {values.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select