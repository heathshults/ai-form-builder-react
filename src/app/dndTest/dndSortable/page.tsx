'use client'
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from '@app/dndTest/dndSortable/dndContainer';

export default function Page() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
    </DndProvider>
  );
}