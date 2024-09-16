import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { DnDFormGroupTypes } from '@app/types'

const style: CSSProperties = {
  display: 'inline-block',
  width: '38%',
  border: '2px solid #252525',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor:' var(--background-color)',
  cursor: 'move',
  boxSizing: 'border-box',
}

export interface DnDFormGroupProps {
  children?: React.ReactNode
  id: string
  label: string
  type: DnDFormGroupTypes
  name: string
  moveDnDFormGroup: (id: string, to: number) => void
  findDnDFormGroup: (id: string) => { index: number }
}

interface Item {
  id: string
  originalIndex: number
}

export const DnDFormGroup: FC<DnDFormGroupProps> = memo(function DnDFormGroup({
  id,
  moveDnDFormGroup,
  findDnDFormGroup,
  children,
}) {
  const originalIndex = findDnDFormGroup(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: IDnDFormGroupTypes.DNDFORMGROUP,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveDnDFormGroup(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveDnDFormGroup],
  )

  const [, drop] = useDrop(
    () => ({
      accept: DnDFormGroupTypes.DNDFORMGROUP,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findDnDFormGroup(id)
          moveDnDFormGroup(draggedId, overIndex)
        }
      },
    }),
    [findDnDFormGroup, moveDnDFormGroup],
  )

  const opacity = isDragging ? 0 : 1
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {children}
    </div>
  )
})
