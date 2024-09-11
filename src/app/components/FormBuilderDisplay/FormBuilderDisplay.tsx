/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import FormFieldsService from '@services/FormFieldsService';
import './FormBuilderDisplay.scss';

interface FormBuilderDisplayProps {
  children?: React.ReactNode
};

export default function FormBuilderDisplay({children}: FormBuilderDisplayProps) {
  const formFieldService = FormFieldsService.getInstance();
  const [fields, setFields] = React.useState<Array<string>>(formFieldService.fields);
  const fieldsRef = React.useRef(fields);
  
  React.useEffect(() => {
    fieldsRef.current = fields;
  }, [fields]);

  React.useEffect(() => {
    const updateFieldsEventSubscription = formFieldService.updateFieldsEvent.subscribe((newFields: string[]) => {
        console.log('formFields display', newFields);
        if (newFields.length !== 0) {
          setFields(newFields);
        }
    })

    return () => {
      updateFieldsEventSubscription.unsubscribe();
    };
  }, [formFieldService.updateFieldsEvent]);

  
  return (
      <>
      {fields}
      
        {/* {!fields.length ? 
          <div className="form-grid-item">
          <div className="form-group">
            <p>To get started enter field names in the prompt below and click &quot;Send&quot;</p>
          </div>
        </div>
      :null}
*/}
     {/* fields.length ? */}
       { fields.map((field, index) => {
          <div key={`${index}-${field}`} className="form-grid-item">
            <div className="form-group">
              <label htmlFor={field} className="text-capitalize">{field}</label>
              <input id={field} className="form-control" name="field" placeholder={field}/>
            </div>
          </div>
        })}
    {/* :null  */}
      </>
    );
};

