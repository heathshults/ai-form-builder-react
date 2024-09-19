'use client'
import * as React from 'react';
import './GetFormField.scss';

interface FormFieldProps {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[]; // For select fields
}

export const GetFormField = ({ type, id, name, label, placeholder, options }: FormFieldProps) => {
  switch (type) {
    case 'text':
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input type="text" id={id} name={name} className="form-control" placeholder={placeholder} />
        </div>
      );
    case 'number':
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input type="number" id={id} name={name} className="form-control" placeholder={placeholder} />
        </div>
      );
    case 'select':
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <select id={id} name={name} className="form-control">
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="form-group form-check">
          <input type="checkbox" id={id} name={name} className="form-check-input" />
          <label htmlFor={id} className="form-check-label">
            {label}
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="form-group">
          <label>{label}</label>
          {options?.map((option, index) => (
            <div key={index} className="form-check">
              <input type="radio" id={`${id}-${index}`} name={name} value={option} className="form-check-input" />
              <label htmlFor={`${id}-${index}`} className="form-check-label">
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default GetFormField;  