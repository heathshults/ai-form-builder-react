'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Field {
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
      type: 'text',
      name: fieldName.trim(),
      label: fieldName.trim(),
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
