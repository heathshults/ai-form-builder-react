/* eslint-disable @typescript-eslint/no-explicit-any */
import update from 'immutability-helper'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DnDFormGroup } from './DNDFormGroup'
import { ItemTypes } from './ItemTypes'

const style = {
  width: 400,
}

export interface ContainerState {
  dndFormGroups: any[]
}

const ITEMS = [
  {
    id: 1,
    text: 'Write JSy',
  },
  {
    id: 2,
    text: 'Make it',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some',
  },
  {
    id: 5,
    text: 'promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
]

export const Container: FC = memo(function Container() {
  const [dndFormGroups, setDnDFormGroups] = useState(ITEMS)

  const findDnDFormGroup = useCallback(
    (id: string) => {
      const dndFormGroup = dndFormGroups.filter((fg) => `${fg.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        dndFormGroup,
        index: dndFormGroups.indexOf(dndFormGroup),
      }
    },
    [dndFormGroups],
  )

  const moveDnDFormGroup = useCallback(
    (id: string, atIndex: number) => {
      const { dndFormGroup, index } = findDnDFormGroup(id)
      setDnDFormGroups(
        update(dndFormGroups, {
          $splice: [
            [index, 1],
            [atIndex, 0, dndFormGroup],
          ],
        }),
      )
    },
    [findDnDFormGroup, dndFormGroups, setDnDFormGroups],
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.DNDFORMGROUP }))
  return (
    <div ref={drop} style={style}>
      {dndFormGroups.map((dndFormGroup) => (
        <DnDFormGroup
          key={dndFormGroup.id}
          id={`${dndFormGroup.id}`}
          text={dndFormGroup.text}
          moveDnDFormGroup={moveDnDFormGroup}
          findDnDFormGroup={findDnDFormGroup}
        />
      ))}
    </div>
  )
})
export default Container