/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { useFormFields } from '@context/FormFieldsContext/FormFieldsContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GridContainer, GridItem, GridRow, ccc, config } from '@app/components/form-builder/FormBuilderDisplay/GridParts/GridParts';
import { useDnDFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

import './FormBuilderDisplay.scss';

interface FormBuilderDisplayProps {
  children?: React.ReactNode
};
interface IFormFields {
  newFields: string[];
}

export const FormBuilderDisplay = ({children}: FormBuilderDisplayProps) => {
  const { fields } = useFormFields();
  const FormFields = ({newFields}: IFormFields) => {

    // Grouping the fields so we can put x items per each row.
    // variables for items per row are held in formsConfig
      const groupedFields = fields.reduce((newFieldsArray, item) => {
          if (newFieldsArray[newFieldsArray.length - 1].length >= config.col) {
            return [...newFieldsArray, [item]];
          }
          newFieldsArray[newFieldsArray.length - 1].push(item);
          console.log('newFieldsArray', newFieldsArray);
          return newFieldsArray;
        },
        [[]]
      ); 

      groupedFields ? console.log('newFields', groupedFields) : console.log('newFields', 'no fields'); 
    
    if (!newFields.length) {
      return (
        <div className="form-grid-item">
          <div className="form-group">
            <p>To get started enter field names in the prompt below and click &quot;Send&quot;</p>
          </div>
        </div>
      );
    }
    return  (
      <DndProvider backend={HTML5Backend}>
      <GridContainer>
         {groupedFields.map((group, rowIndex) => (
            <GridRow key={`row-${rowIndex}`}>

            { group.map((item, colIndex) => (
                <GridItem key={`col-${rowIndex}-${colIndex}`}>
                  <div className="form-group hs-formbuilder-grid-formgroup">
                    <label htmlFor={item.name} className="text-capitalize">{item.label}</label>
                    <input id={item.name} type={item.type} className="form-control" name={item.name} placeholder={item.name}/>
                  </div>
                </GridItem>
            ))}
          </GridRow>
          
        ))}
         
      </GridContainer>
      </DndProvider>
    )
  }
      
      
      
      
    //   groupedFields.map(field => (
    //   <div key={field.name} className="form-grid-item">
    //     <div className="form-group">
    //       <label htmlFor={field.name} className="text-capitalize">{field.label}</label>
    //       <input id={field.name} type={field.type} className="form-control" name={field.name} placeholder={field.name}/>
    //     </div>
    //   </div>
    // ));

  console.log('fields', fields);  
  console.log('fields', typeof fields);
  
  return (
      <>
        <div className="container p-3 hs-fields-display">
          <DndProvider backend={HTML5Backend}>
            <FormFields newFields={fields} />
        </DndProvider>
        </div>

      </>
    );
};

export default FormBuilderDisplay