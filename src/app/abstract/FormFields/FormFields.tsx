import React from "react";
import InputField from "./Fields/Input/InputField";
import { v4 as uuidv4 } from 'uuid';

export interface InputField extends HTMLInputElement {
  type: 'text' | 'number' | 'email' | 'password' | 'radio' | 'checkbox' | 'tel' | 'hidden';
}

export default class FormFields extends React.Component {
  fieldType: string;
  fieldProps: IFieldTypes;
  Element: React.FC;
  El: React.FC
  NAME: string;

  constructor(props: IFieldTypes, type, name ) {
    displayName: 'FormFields';
    super(props);
    this.fieldProps = props;
    this.FormField.type = type;
    NAME = name
  }
  ElementAttributes() {
    const ElementProps = Object.assign({}, this.fieldProps, props, ...rest)
    const newPropObject = {
      addedProps: ElementProps,
      elementType: type,
      elementName: name,
      elementId: uuidv4()
    }
    return newPropObject     
    
  } 
  
  private makeElement() {
    console.log('ElementAttributes', ElementAttributes())
      
    El = React.createElement(
      NAME,
      { id: newPropObject.elementId, name: this.NAME, type: newPropObject.formField.type, ...newPropObject }
    );
     return El  
  }

componentDidMount(): void {};

  render() {
    const NewElement = this.makeElement();
    const Element = NewElement;

    return (
      <Element {...this.fieldProps} />
    )
  }
}


/* 
this.compound = {
    location: {
      address: { type: 'text', label: 'Address' },
      address2: { type: 'text', label: 'Address 2' },
      city: { type: 'text', label: 'City' },
      state: { type: 'select', options: ['CA', 'NY', 'TX'], label: 'State' },
      zip: { type: 'text', label: 'Zip' }
    },
    name: ['firstName', 'middleName', 'lastName']
*/