'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Field {
  id: string;
  type: string;
  name: string;
  label: string;
}

interface FormFieldsContextType {
  fields: Field[];
  addField: (field: Field) => void;
  removeField: (name: string) => void;
  setFields: (fieldsString: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formFieldsObject = {
  type, 
  id, 
  name, 
  label,
  labelClass,
  inputClass,
  placeholder,
  textareaHeight,
  options,
  required='false',
  disabled='false',
  readOnly='false',
  value,
  validationRegx,
  errorMessage,
  style,
  onchange,
  onclick
}

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
    const fieldsArray = fieldsString.split(',').map((fieldName) => ({
      id: uuidv4(),
      type: 'text',
      name: fieldName.trim(),
      label: fieldName.trim(),
      required:true,
      
    }));
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
