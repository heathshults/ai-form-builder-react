'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import update from 'immutability-helper'
import React, { useState, useCallback, memo } from 'react';
import { useFormFields } from '@context/FormFieldsContext/FormFieldsContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GridContainer, GridItem, GridRow, css } from '@app/components/form-builder/FormBuilderDisplay/GridParts/GridParts';
import { useDnDFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import { useConfigContext } from '@context/ConfigContext';
import { useDrop } from 'react-dnd';
import { DnDFormGroupTypes } from '@app/types';
import { DnDFormGroup } from '@app/components/form-builder/FormBuilderDisplay/DNDFormGroup';
import GetFormField from '@app/components/form-builder/FormBuilderDisplay/GetFormField/GetFormField';
import FormFieldMenu from '@app/components/form-builder/FormBuilderDisplay/FormFieldMenu/FormFieldMenu';
import { objectKeysAreValid } from '@app/utils/validateObjectKeys';
import { formFieldPropsArray } from '@app/components/form-builder/FormBuilderDisplay/form-field-properties';
import './FormBuilderDisplay.scss';

interface FormBuilderDisplayProps {
  children?: React.ReactNode
};
interface IFormFields {
  newFields: string[];
}

export const FormBuilderDisplay: React.FC = memo(function FormBuilderDisplay({ children }: FormBuilderDisplayProps) {
  const config = useConfigContext();
  const { col, row, width, height } = config;
  const { fields } = useFormFields();
  const [ show, setShow ] = useState(false);
  const [ errorMessage, setErrMessage ] = useState('');



  const FormFields = ({ newFields }: IFormFields) => {
    console.log('check keys', objectKeysAreValid(newFields, formFieldPropsArray));
    const [ dndFormGroups, setDnDFormGroups ] = useState(newFields)
   

    // Grouping the fields so we can put x items per each row.
    const groupedFields = dndFormGroups.reduce((newFieldsArray, item) => {
      if (newFieldsArray[ newFieldsArray.length - 1 ].length >= config.col) {
        return [ ...newFieldsArray, [ item ] ];
      }
      newFieldsArray[ newFieldsArray.length - 1 ].push(item);
      console.log('newFieldsArray', newFieldsArray);
      return newFieldsArray;
    },
      [ [] ]
    );



    // ====== Drag and Drop =============================================//
    const findDnDFormGroup = useCallback(
      (id: string) => {
        if (!dndFormGroups) return;
        const dndFormGroup = dndFormGroups.filter((fg) => `${fg.id}` === id)[ 0 ] as {
          id: number
          label: string
        }
        
        return {
          dndFormGroup,
          index: dndFormGroups.indexOf(dndFormGroup),
        }
      },
      [ dndFormGroups ],
    )

    const moveDnDFormGroup = useCallback(
      (id: string, atIndex: number) => {
        const { dndFormGroup, index } = findDnDFormGroup(id)
        setDnDFormGroups(
          update(dndFormGroups, {
            $splice: [
              [ index, 1 ],
              [ atIndex, 0, dndFormGroup ],
            ],
          }),
        )
      },
      [ dndFormGroups, findDnDFormGroup ]
    )

    const [ , drop ] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))


    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <GridContainer>
            {!dndFormGroups.length ? (
              <div className="">
                <div className="p-3">
                  <p>To get started enter field names in the prompt below and click &quot;Send&quot;</p>

                  <GetFormField type="text" label="Test Label" />
                </div>
              </div>
            ) : (
              <div ref={drop}>
                {groupedFields.map((group, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="hs-formbuilder-grid-row" style={css.hsFormbuilderGridRow}>
                    {group.map((item, colIndex) => (
                      item ? (
                        <div className='hs-formbuilder-grid-formgroup' key={`col-${rowIndex}-${colIndex}`}>
                        <DnDFormGroup
                          id={item.id}
                          key={`col-${rowIndex}-${colIndex}`}
                          className="hs-formbuilder-grid-item"
                          style={css.hsFormbuilderGridItem}
                          type={DnDFormGroupTypes.DNDFORMGROUP}
                          moveDnDFormGroup={moveDnDFormGroup}
                          findDnDFormGroup={findDnDFormGroup}
                        >
                          <div item={item.id} className="hs-formbuilder-grid-formgroup">


                            {/* <FormFieldMenu/> */}
                            <GetFormField
                              type={item.type}
                              label={item.label}
                              placeholder={item.placeholder}
                              required={item.required}
                              errorMessage={item.errorMessage}
                              onclick={item.onclick}
                            />
                            {/* <input id={item.name} type={item.type} className="form-control" name={item.name} placeholder={item.name} /> 
                            *<label htmlFor={item.name} className="text-capitalize">{item.label}</label> */}
                          </div>
                        </DnDFormGroup>
                        </div>
                      ) : null
                    ))}
                  </div>
                ))}
              </div>
            )}
          </GridContainer>
        </DndProvider>
      </>

    );
  }
  // ====================================================================== //


  return (
    <>
      <div className="container p-3 hs-fields-display">
        <DndProvider backend={HTML5Backend}>
          <FormFields newFields={fields} />
        </DndProvider>
      </div>

    </>
  );
})

export default FormBuilderDisplay


//   groupedFields.map(field => (
//   <div key={field.name} className="form-grid-item">
//     <div className="form-group">
//       <label htmlFor={field.name} className="text-capitalize">{field.label}</label>
//       <input id={field.name} type={field.type} className="form-control" name={field.name} placeholder={field.name}/>
//     </div>
//   </div>
// ));

/* {groupedFields.map((group, rowIndex) => (
    <div key={`row-${rowIndex}`} className="hs-formbuilder-grid-row" style={css.hsFormbuilderGridRow}>

      {group.map((item, colIndex) => (
        <div 
          id={`col-${rowIndex}-${colIndex}`}
          key={`col-${rowIndex}-${colIndex}`} 
          className="hs-formbuilder-grid-item" 
          style={css.hsFormbuilderGridItem}
          moveDnDFormGroup={moveDnDFormGroup}
          findDnDFormGroup={findDnDFormGroup}
        >
          <div className="form-group hs-formbuilder-grid-formgroup">
            <label htmlFor={item.name} className="text-capitalize">{item.label}</label>
            <input id={item.name} type={item.type} className="form-control" name={item.name} placeholder={item.name} />
          </div>
        </div>
      ))}
    </div>
    
  ))}
    */