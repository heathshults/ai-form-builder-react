'use client'
import * as React from 'react';
// import type { FormFieldProps } from '@app/types';
import './GetFormField.scss';


export const GetFormField = ({ type, id, name, label, labelClass, inputClass, placeholder, textareaHeight, options, required, disabled, readOnly, value, validationRegx, errorMessage, style, onChange, onClick }: FormFieldProps) => {
  switch (type) {
    case 'text':
      return (
        <div className="form-group form-floating">
          <label className={labelClass} htmlFor={id}>{label}</label>
          <input placeholder={label} require={required} type="text" id={id} name={name} className={`form-control ${inputClass}`} placeholder={placeholder} />
        </div>
      );
    case 'number':
      return (
        <div className="form-group form-floating">
          <input placeholder={label} require={required} type="number" id={id} name={name} className={`form-control ${inputClass}`} placeholder={placeholder} />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      );
    case 'select':
      return (
        <div className="form-group form-floating">
          <select id={id} name={name} className={`form-select ${inputClass}`}>
          <option selected>Make a selection</option>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      );
    case 'checkbox':
      return (
        <div className="form-group form-check">
          <input placeholder={label} require={required} type="checkbox" id={id} name={name} className="form-check-input" />
          <label className={`form-check-label  ${labelClass}`} htmlFor={id}>
            {label}
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="form-group form-floating">
          <label className={labelClass}>{label}</label>
      {options?.map((option, index) => (
            <div key={index} className="form-check">
              <input placeholder={label} require={required} type="radio" id={`${id}-${index}`} name={name} value={option} className="form-check-input" />
              <label className={`form-check-label ${labelClass}`} htmlFor={`${id}-${index}`} >
                {option}
              </label>
            </div>
          ))}
        </div>
      );
    case 'textarea':
      return (
        <div className="form-group form-floating">
          <textarea require={required} type="number" id={id} name={name} style={textareaHeight} className={`form-control ${inputClass}`} placeholder={placeholder} />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      );
    default:
      return null;
  }
};

export default GetFormField;  