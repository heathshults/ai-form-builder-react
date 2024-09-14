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

import './FormBuilderDisplay.scss';

interface FormBuilderDisplayProps {
  children?: React.ReactNode
};
interface IFormFields {
  newFields: string[];
}

export const FormBuilderDisplay: React.FC = memo(function FormBuilderDisplay({ children }: FormBuilderDisplayProps) {
  const { fields } = useFormFields();
  const config = useConfigContext();

  const FormFields = ({ newFields }: IFormFields) => {
    const [ dndFormGroups, setDnDFormGroups ] = useState(fields)

    // Grouping the fields so we can put x items per each row.
    const groupedFields = fields.reduce((newFieldsArray, item) => {
      if (newFieldsArray[ newFieldsArray.length - 1 ].length >= config.col) {
        return [ ...newFieldsArray, [ item ] ];
      }
      newFieldsArray[ newFieldsArray.length - 1 ].push(item);
      console.log('newFieldsArray', newFieldsArray);
      return newFieldsArray;
    },
      [ [] ]
    );

    groupedFields ? console.log('newFields', groupedFields) : console.log('newFields', 'no fields');

    // ====== Drag and Drop =============================================//
    const findDnDFormGroup = useCallback(
      (id: string) => {
        if (!groupedFields) return;
        const dndFormGroup = groupedFields.filter((fg) => `${fg.id}` === id)[ 0 ] as {
          id: number
          text: string
        }
        console.log('dndFormGroup', dndFormGroup);
        return {
          dndFormGroup,
          index: groupedFields.indexOf(dndFormGroup),
        }
      },
      [ groupedFields ],
    )

    const moveDnDFormGroup = useCallback(
      (id: string, atIndex: number) => {
        const { dndFormGroup, index } = findDnDFormGroup(id)
        console.log('dndFormGroup', dndFormGroup);
        setDnDFormGroups(
          update(dndFormGroups, {
            $splice: [
              [ index, 1 ],
              [ atIndex, 0, dndFormGroup ],
            ],
          }),
        )
      },
      [ findDnDFormGroup, dndFormGroups, setDnDFormGroups ],
    )

    const [ , drop ] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))




    if (!groupedFields.length) {
      return (<>
        <div className="form-grid-item">
          <div className="form-group">
            <p>To get started enter field names in the prompt below and click &quot;Send&quot;</p>
          </div>
        </div>

      </>
      );
    }



    return (
      <DndProvider backend={HTML5Backend}>
        <GridContainer>
          <div ref={drop}>
            {groupedFields.map((group, rowIndex) => (
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
          </div>

        </GridContainer>
      </DndProvider>
    )
  }
// ====================================================================== //




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