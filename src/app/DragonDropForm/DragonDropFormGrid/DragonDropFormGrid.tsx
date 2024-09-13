'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDnDFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

const FormGrid: React.FC = () => {
  const { fields, updateField, removeField } = useDnDFormContext();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    updateField({ ...movedItem, index: result.destination.index });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ padding: '8px', width: '100%', minHeight: '100px' }}
          >
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '8px',
                      marginBottom: '8px',
                      background: '#fff',
                    }}
                  >
                    <span>{field.label}</span>
                    <button onClick={() => removeField(field.id)}>Remove</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FormGrid;
