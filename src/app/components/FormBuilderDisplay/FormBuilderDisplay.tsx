/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { useFormFields } from '@context/FormFieldsContext/FormFieldsContext';
import './FormBuilderDisplay.scss';

interface FormBuilderDisplayProps {
  children?: React.ReactNode
};
interface IFormFields {
  newFields: string[];
}

export const FormBuilderDisplay = ({children}: FormBuilderDisplayProps) => {
  const { fields } = useFormFields();
  const FormFields = ({newFields}: IFormFields) => {
    if (!newFields.length) {
      return (
        <div className="form-grid-item">
          <div className="form-group">
            <p>To get started enter field names in the prompt below and click &quot;Send&quot;</p>
          </div>
        </div>
      );
    }
    return fields.map(field => (
      <div key={field.name} className="form-grid-item">
        <div className="form-group">
          <label htmlFor={field.name} className="text-capitalize">{field.label}</label>
          <input id={field.name} type={field.type} className="form-control" name={field.name} placeholder={field.name}/>
        </div>
      </div>
    ));
  }

  console.log('fields', fields);  
  console.log('fields', typeof fields);
  
  return (
      <>
        <div className="container p-3 hs-fields-display">
          <FormFields newFields={fields} />
        </div>

      </>
    );
};

export default FormBuilderDisplay