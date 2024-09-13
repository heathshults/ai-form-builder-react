'use client'
import React, { useState } from 'react';
import { useFormFields } from '@context/FormFieldsContext/FormFieldsContext';
import './form-builder-prompt.scss';


export interface FormBuilderPromptProps {}

export const FormBuilderPrompt = ({ }: FormBuilderPromptProps) => {
  const { setFields } = useFormFields();
  const [fieldsString, setFieldsString] = useState('');
  const saveButton = React.useRef<HTMLButtonElement>(null);
  const buttonGroup = React.useRef<HTMLDivElement>(null);
  const [isSaveButtonActive, setIsSaveButtonActive] = React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFields(fieldsString);
    !isSaveButtonActive ? setIsSaveButtonActive(true) : void(0);
  };



    function savePrompt() {
      !isSaveButtonActive ? setIsSaveButtonActive(true) : void(0);
    }

    React.useEffect(() => {
      isSaveButtonActive
        ? buttonGroup.current.classList.add('btn-group')
        : buttonGroup.current.classList.remove('btn-group');
        
    },[isSaveButtonActive]);

  return (
  <>
    <div className="hs-form-builder">
      <form onSubmit={handleSubmit} className="hs-prompt-form">
        <div className="hs-prompt-input-wrapper">
          <label className="hs-input-label" htmlFor="fields">Enter form fields (comma-separated):</label>
            <input 
              id="fields" 
              name="fields" 
              placeholder="e.g., Name, Phone, Address, Email" 
              className="hs-prompt-input form-control-lg"
              value={fieldsString}
              onChange={(e) => setFieldsString(e.target.value)}
            />
          
          <div ref={buttonGroup} className="hs-action-button-wrapper">
                <button type="submit" className="hs-prompt-button btn">
                  <span className="hs-button-text">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="currentColor" className="bi bi-arrow-up-circle-fill hs-button-icon" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                  </svg>
                </button>
                {isSaveButtonActive ?
                  <button ref={saveButton} className="btn hs-save-button" onClick={savePrompt}>
                    <span className="hs-button-text">Save</span>
                    <svg width="24" height="24" fill="currentColor" className="bi bi-arrow-up-circle-fill hs-button-icon" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>
                  </button>
                :null}
                </div>
          </div>

      </form>
    </div>
  
  </>);
};

export default FormBuilderPrompt;

{/* <div className="hs-form-builder-prompt">
    <div className="hs-form-builder-prompt__content">
      <div className="hs-form-builder-prompt__content__header">
        <h2>Form Builder</h2>
        <button className="hs-form-builder-prompt__content__header__close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M8 7.354L2.354 1.707 1.646 2.415 7.293 8 1.646 13.646l.708.708L8 8.707l5.646 5.647.708-.708L8.707 8 14.354 2.354l-.708-.708z"/>
          </svg>
        </button>
      </div>
      <div className="hs-form-builder-prompt__content__body">
        <p>Drag and drop form elements here</p>
      </div>
    </div>
  </div> */}