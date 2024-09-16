'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import update from 'immutability-helper'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DnDFormGroup } from '@app/dndTest/dndSortable/DNDFormGroup'
import { ItemTypes } from '@app/dndTest/dndSortable/ItemTypes'

const style = {
  width: 400,
}

export interface ContainerState {
  dndFormGroups: any[]
}

// const ITEMS = [
//   {
//     id: 1,
//     text: 'Write JSy',
//   },
//   {
//     id: 2,
//     text: 'Make it',
//   },
//   {
//     id: 3,
//     text: 'Write README',
//   },
//   {
//     id: 4,
//     text: 'Create some',
//   },
//   {
//     id: 5,
//     text: 'promote it',
//   },
//   {
//     id: 6,
//     text: '???',
//   },
//   {
//     id: 7,
//     text: 'PROFIT',
//   },
// ]

const fields = [
  {
    id: 1,
    type: 'text',
    name: 'fieldName',
    label: 'fieldName',
    text: 'fieldlkjklkName',
  },
  {
    id: 2,
    type: 'text',
    name: 'fieldName',
    label: 'fieldName',
    text: 'kkkkk',
  },
  {
    id: 3,
    type: 'text',
    name: 'fieldName',
    label: 'fieldName',
    text: 'pppppp',
  },
  {
    id: 4,
    type: 'text',
    name: 'fieldName',
    label: 'fieldName',
    text: 'ffffff',
  },
  {
    id: 5,
    type: 'text',
    name: 'fieldName',
    label: 'fieldName',
    text: 'fieldName',
  },
]

export const Container: FC = memo(function Container() {
  const [ dndFormGroups, setDnDFormGroups ] = useState(fields)

  //=====================================================================

  // Grouping the fields so we can put x items per each row.
  const groupedFields = dndFormGroups.reduce((newFieldsArray, item) => {
    if (newFieldsArray[ newFieldsArray.length - 1 ].length >= 4) {
      return [ ...newFieldsArray, [ item ] ];
    }
    newFieldsArray[ newFieldsArray.length - 1 ].push(item);
    console.log('newFieldsArray', newFieldsArray);
    return newFieldsArray;
  },
    [ [] ]
  );


  //=====================================================================

  const findDnDFormGroup = useCallback(
    (id: string) => {
      const dndFormGroup = dndFormGroups.filter((fg) => `${fg.id}` === id)[ 0 ] as {
        id: number
        text: string
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
    [ findDnDFormGroup, dndFormGroups, setDnDFormGroups ],
  )

  const [ , drop ] = useDrop(() => ({ accept: ItemTypes.DNDFORMGROUP }))
  return (
    <div ref={drop} style={style}>
      {groupedFields.map((group, rowIndex) => (
        <div key={`row-${rowIndex}`} className="hs-formbuilder-grid-row" style={{
          flex: '1 1 auto',
          flexDirection: 'row',
          justifyContent: 'left',
          alignItems: 'center',
          gridRow: 'auto',
          padding: 0,
          margin: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {group.map((dndFormGroup) => (
            <DnDFormGroup
              key={dndFormGroup.id}
              id={`${dndFormGroup.id}`}
              text={dndFormGroup.text}
              className="hs-formbuilder-grid-item"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gridArea: 'auto',
                padding: '1rem',
                margin: '.25rem',
                border: '1px solid #ccc',
                backgroundColor: '#191919',
                minWidth: '150px',
                boxSizing: 'border-box',
              }}
              moveDnDFormGroup={moveDnDFormGroup}
              findDnDFormGroup={findDnDFormGroup}
            >
<div className="form-group hs-formbuilder-grid-formgroup">
                      <label htmlFor={dndFormGroup.name} className="text-capitalize">{dndFormGroup.label}</label>
                      <input id={dndFormGroup.name} type={dndFormGroup.type} className="form-control" name={dndFormGroup.name} placeholder={dndFormGroup.name} />
                    </div>
              </DnDFormGroup>
          ))}
        </div>
      ))}
    </div>
  )
})
export default Container