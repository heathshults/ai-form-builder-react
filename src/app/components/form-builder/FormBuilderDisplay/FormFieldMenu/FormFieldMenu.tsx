'use client'
import * as React from 'react';
import './FormFieldMenu.scss';
import { FormFieldProps } from '@app/types';


interface FormFieldMenuProps extends FormFieldProps {
  children: React.ReactNode
};

export const FormFieldMenu = ({children}: FormFieldMenuProps) => {
    return (
      <>
        <div class="dropdown form-field-menu">
          <button class="btn btn-three-dot dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"/>
            <div className="input-group-text">
              <ul class="dropdown-menu">
                {FormFieldAttributes.map((attr, index) => {
                  return (
                    <li key={`key-${index}-${attr.name}`}>
                      <label htmlFor={`${index}-${attr.name}`}>{attr.name}</label>
                      <input id={`${index}-${attr.name}`} type="checkbox" value={attr}>{attr}</input>
                    </li>
                  );
                })}
              </ul>
            </div>
        </div>
        {children}
      </>
    );
};

export default FormFieldMenu;