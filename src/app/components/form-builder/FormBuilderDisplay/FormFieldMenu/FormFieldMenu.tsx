'use client'
import * as React from 'react';
import './FormFieldMenu.scss';
import { FormFieldProps } from '@app/types';
// import { formFieldPropsArray, formFieldProperties } from '@app/components/form-builder/FormBuilderDisplay/form-field-properties';

interface FormFieldMenuProps {
  formFieldPropsArray: string[];
}

const FormFieldMenu: React.FC<FormFieldMenuProps> = () => {
  const [ menuIsVisible, setMenuIsVisible ] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const formFieldProperties: FormFieldProps = {
    type: 'text',
    id: 'text',
    name: 'text',
    label: 'Text',
    labelClass: 'form-label',
    inputClass: 'form-control',
    placeholder: 'Enter text',
    textareaHeight: '100px',
    options: [],
    required: false,
    disabled: false,
    readOnly: false,
    value: '',
    validationRegx: null,
    errorMessage: '',
    style: {},
    onChange: (e) => e.target.value,
    onClick: (e) => e.target.value,
  };

  // React.useEffect(() => {
  //   const viewPortWidth = window.innerWidth;
  //   const viewPortHeight = window.innerHeight;
  //   const menuRightSideCoord = menuRef.current?.getBoundingClientRect().right;
  //   const menuWidth = menuRef.current?.getBoundingClientRect().width;


  //   if (menuRightSideCoord - menuWidth <= menuWidth) {
  //     menuRef.current?.classList.add('dropdown-menu-left');
  //   }

  // }, [])



  const handleClick = () => {
    
      
      menuIsVisible ? setMenuIsVisible(false) : setMenuIsVisible(true);
      console.log('menuIsVisible', menuIsVisible);
      return true
  }

  const MenuItems: React.FC = () => {
    const neewArray: FormFieldProps = Object.keys(formFieldProperties);
    
    console.log('neewArray', neewArray);
    return (
      <>
      {/* <div className="input-group-text"> */}
        { neewArray.map((attr, index) => (

          <li key={`key-${index}-${attr}`} className="dropdown-item input-group-text">
            <label htmlFor={`${index}-${attr}`}>{attr}</label>
            <input id={`${index}-${attr}`} name={attr} type="checkbox" value={attr} />
          </li>

        ))}
        {/* </div> */}
      </>
    );
  };

  return (
    <>
      <div className="dropdown form-field-menu">
        <button
          ref={menuButtonRef}
          className="btn btn-three-dot dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </button>
        {menuIsVisible ? <ul ref={menuRef} className="dropdown-menu">
            
              <MenuItems thearray={formFieldProperties} />
      
          </ul>
        : null}
      </div>
    </>
  );
};

export default FormFieldMenu;