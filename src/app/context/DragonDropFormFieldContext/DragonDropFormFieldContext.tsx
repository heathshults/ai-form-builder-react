'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormField {
  id: string;
  type: string;
  label: string;
}

interface FormContextType {
  fields: FormField[];
  addField: (field: FormField) => void;
  updateField: (field: FormField) => void;
  removeField: (id: string) => void;
  saveLayout: () => void;
}  

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<FormField[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFields = localStorage.getItem('formFields');
      return savedFields ? JSON.parse(savedFields) : [];
    }
    return [];
  });

  const addField = (field: FormField) => {
    setFields((prevFields) => [...prevFields, field]);
  };

  const updateField = (updatedField: FormField) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
  };

  const removeField = (id: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const saveLayout = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formFields', JSON.stringify(fields));
    }
  };

  return (
    <FormContext.Provider value={{ fields, addField, updateField, removeField, saveLayout }}>
      {children}
    </FormContext.Provider>
  );
};

export const useDnDFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useDnDFormContext must be used within a FormProvider');
  }
  return context;
};
