/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
// import type { FormFieldProps } from '@app/types';
import './GetFormField.scss';
import { FormFieldProps } from '@app/types';
import { formFieldProperties } from '@app/components/form-builder/FormBuilderDisplay/form-field-properties';


export const GetFormField: FormFieldProps = ({ 
    type='text', id='', name='input name', label='label text', labelClass, inputClass, 
    placeholder, textareaHeight, options, required='false', 
    disabled='false', readOnly, value, validationRegx, 
    errorMessage, style, onchange, onclick }: FormFieldProps) => {

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let theSelect
    if (e.target) {
      theSelect = e.target as HTMLSelectElement
      theSelect.options[theSelect.selectedIndex].value
    }
  }

  function getInput(type) {
    return React.createElement(
      type,
      {}
    )
  }

  switch (type) {
    case 'text':
      return (<>
        <div className="form-group form-floating">
          
          <input 
            placeholder={placeholder}  
            require={required.toString()} 
            type="text" 
            id={id} name={name}
            className={`form-control ${inputClass}`} 
          />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
        </>
      );
    case 'email':
      return (<>
        <div className="form-group form-floating">
          
          <input 
            placeholder={placeholder}  
            require={required.toString()} 
            type="text" 
            id={id} name={name}
            className={`form-control ${inputClass}`} 
          />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
        </>
      );
    case 'number':
      return (
        <div className="form-group form-floating">
          <input 
            placeholder={placeholder}  
            require={required.toString()} 
            type="number" 
            id={id} 
            name={name} 
            className={`form-control ${inputClass}`} 
          />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      );
    case 'select':
      return (<>
        <div className="form-group form-floating">
          <select 
            id={id} 
            name={name} 
            className={`form-select ${inputClass}`}
            
            onChange={handleSelectChange}
          >
          <option value="make a selection">Make a selection</option>
            {options?.map((option, index) => (
              <option key={index} value={option} >
                {option}
              </option>
            ))}
          </select>
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      </>);
    case 'checkbox':
      return (
        <div className="form-group form-check">
          <input 
            placeholder={placeholder}  
            require={required.toString()} 
            type="checkbox" 
            id={id} 
            name={name} 
            className="form-check-input" 
          />
          <label className={`form-check-label  ${labelClass}`} htmlFor={id}>
            {label}
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="form-group form-floating">
      {options?.map((option, index) => (
            <div key={index} className="form-check">
              <input 
                placeholder={placeholder}  
                require={required.toString()} 
                type="radio" id={`${id}-${index}`} 
                name={name} 
                value={option} 
                className="form-check-input" 
              />
              <label className={`form-check-label ${labelClass}`} htmlFor={`${id}-${index}`} >
                {option}
              </label>
            </div>
          ))}
                    <label className={labelClass}>{label}</label>
        </div>
      );
    case 'textarea':
      return (
        <div className="form-group form-floating">
          <textarea 
            require={required.toString()} 
            type="number" 
            id={id} 
            name={name} 
            style={textareaHeight} 
            className={`form-control ${inputClass}`} 
            placeholder={placeholder} 
          />
          <label className={labelClass} htmlFor={id}>{label}</label>
        </div>
      );
    default:
      return null;
  }
};

export default GetFormField;  