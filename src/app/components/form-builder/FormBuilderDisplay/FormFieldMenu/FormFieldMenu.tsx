'use client'
import * as React from 'react';
import './FormFieldMenu.scss';
import { FormFieldProps } from '@app/types';
import { formFieldPropsArray, formFieldProperties } from '@app/components/form-builder/FormBuilderDisplay/form-field-properties';


interface FormFieldMenuProps extends FormFieldProps {
  children: React.ReactNode
};

export const FormFieldMenu = ({children}: FormFieldMenuProps) => {


  const MenuItems = ()=> {
    console.log('formFieldPropsArray', formFieldPropsArray);
    return (<>
      {formFieldProperties.map((attr, index) => {
        <li key={`key-${index}-${attr[index]}`}>
          <label htmlFor={`${index}-${attr[index]}`}>{attr[index]}</label>
          <input id={`${index}-${attr[index]}`} name={attr[index]} type="checkbox" value={attr[index]}>{attr[index]}</input>
        </li>
    })}
    </>);
    }
  
    return (
      <>
        <div className="dropdown form-field-menu">
          <button className="btn btn-three-dot dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
          </svg>
          </button>
            <div className="input-group-text">
              <ul className="dropdown-menu">
                <MenuItems/>
              </ul>
            </div>
        </div>
        {children}
      </>
    );
};

export default FormFieldMenu;