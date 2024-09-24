'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Field {
  id: string;
  type: string;
  name: string;
  label: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  options?: string[]; // For select fields
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  validationRegx?: RegExp;
  errorMessage?: string;
  style: React.CSSProperties;
  textareaHeight: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onclick?: (string) => void;
  [key: string]: undefined | string | number | boolean | string[] | RegExp | React.CSSProperties | ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) | ((string) => void);
}

interface FormFieldsContextType {
  fields: Field[];
  addField: (field: Field) => void;
  removeField: (name: string) => void;
  setFields: (fieldsString: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const formFieldsObject = {
//   type, 
//   id, 
//   name, 
//   label,
//   labelClass,
//   inputClass,
//   placeholder,
//   textareaHeight,
//   options,
//   required='false',
//   disabled='false',
//   readOnly='false',
//   value,
//   validationRegx,
//   errorMessage,
//   style,
//   onchange,
//   onclick
// }

const FormFieldsContext = createContext<FormFieldsContextType | undefined>(undefined);

export const FormFieldsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fields, setFieldsState] = useState<Field[]>([]);

  const addField = (field: Field) => {
    setFieldsState((prevFields) => [...prevFields, field]);
  };

  const removeField = (name: string) => {
    setFieldsState((prevFields) => prevFields.filter((field) => field.name !== name));
  };

  const setFields = (fieldsString: string) => {
    const fieldsArray = fieldsString.split(',').map((fieldString) => {
      const [namePart, ...propsParts] = fieldString.split(':');
      const fieldObject: FormFieldProps = {
        id: uuidv4(),
        name: namePart.trim(),
        type: 'text', // Default type
        label: namePart.trim(),
      };

      propsParts.forEach((propPart) => {
        const [key, value] = propPart.split('=');
        if (key && value) {
          fieldObject[key.trim()] = value.trim().replace(/['"]/g, ''); // Remove quotes
        }
      });

      return fieldObject;
    });
    console.log('myfieldsArray', fieldsArray);
    setFieldsState(fieldsArray);
  };

  return (
    <FormFieldsContext.Provider value={{ fields, addField, removeField, setFields }}>
      {children}
    </FormFieldsContext.Provider>
  );
};

export const useFormFields = () => {
  const context = useContext(FormFieldsContext);
  if (context === undefined) {
    throw new Error('useFormFields must be used within a FormFieldsProvider');
  }
  return context;
};
