'use client'
import * as React from 'react';
import './TextField.module.scss';


interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  theme?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'undefined'; 
  fieldType: 'text' | 'number' | 'email' | 'password' | 'radio' | 'checkbox' | 'tel' | 'hidden';
  label: string;
  floatingLabel?: boolean | string | 'undefined';
  size?: 'small' | 'medium' | 'large' | 'undefined';
  fieldName: string;
  formGroup?: string | 'undefined';
  fieldId: string | number;
  cssClass?: string | 'undefined';
  required?: boolean | string | 'undefined';
  placeholder?: string | 'undefined';
  errorMessage?: string | 'undefined'; 
  width?: string | number | 'undefined';
  height?: string | number | 'undefined';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const InputField = ({fieldType, label, fieldName, fieldId, width='150px'}: InputFieldProps) => {
  const [errorMessageText, setErrorMessageText] = React.useState<string | 'undefined'>();
  const [cssClassText, setCssClassText] = React.useState<string | 'undefined'>();
  const [floatingLabelValue, setFloatingLabelValue] = React.useState<boolean | string | 'undefined'>();

  (typeof errorMessage !== 'undefined') ? setErrorMessageText(errorMessage) : setErrorMessageText('undefined');
  (typeof cssClass !== 'undefined') ? setCssClassText(cssClass) : setCssClassText('undefined');
  isFloatingLabel ? setFloatingLabelValue(true) : setFloatingLabelValue('undefined');

  
  return (
      <>
        <div className={`mb-3 p-0 ${floatingLabelValue ? 'form-floating' : 'd-inline-block'}`}>
          {!floatingLabelValue ? 
            <label for={fieldId} className="form-label">{label}</label>
          : null}
          <input 
            id={fieldId} 
            type={fieldType} 
            className={`form-control ${cssClass ? cssClassText : ''}`}
            name={fieldName}
            style={{width: width}}
            reqired={required ? 'true' : 'false'}
          />
          {isFloatingLabel ? 
          <label for={fieldId}>{label}</label>
          : null}
          {typeof errorMessage !== 'undefined' ? 
            <div className="form-text error-message">{errorMessageText}</div>
          :null}
          
        </div>
      </>
    );
};

export default InputField;