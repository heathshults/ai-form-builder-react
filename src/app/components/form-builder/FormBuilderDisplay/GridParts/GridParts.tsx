'use client'
import * as React from 'react';
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DnDFormGroupTypes } from '@app/types'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import './GridParts.scss';


interface GridPartsProps {
  children: React.ReactNode
};
interface IDragonDropGrid {
  children?: React.ReactNode
};
interface IDragonDropGridContainer {
  children?: React.ReactNode
  col: number;
  row: number;
};

interface IDragonDropGridCanvas {
  children?: React.ReactNode
  width?: number | string;
  height?: number | string;
};
export const config = { col: 3, row: 3, width: '550px', height: '100%' };

export const GridParts = ({children}: GridPartsProps) => {
    return (
      <>
        {children}
      </>
    );
};

export const GridCanvas = ({ children }: IDragonDropGridCanvas) => {
  return (<>
    <div className="container p-0 m-0">
      {children}
    </div>
  </>)
}


export const GridRow = ({ children }: { children: React.ReactNode }) => (
  <div className="hs-formbuilder-grid-row">{children}</div>
);

export const GridItem = () => <div className="hs-formbuilder-grid-item"></div>;

export const GridContainer = ({ children, col, row }: IDragonDropGridContainer) => {
  const gridColumns = Array.from({ length: col });
  const gridRows = Array.from({ length: row });
  const [dndFormGroups, setDnDFormGroups] = useState(DnDFormGroupTypes)

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

  const [, drop] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))

  

  return (
    <>
        <GridCanvas width={config.width} height={config.height}>
      <div className="container pt-3" style={{maxWidth: '75%'}}>
          <div className="hs-formbuilder-grid-container">
            {children}
          </div>
      </div>
        </GridCanvas>
    </>
  );
};
export default memo(GridContainer);

  export const Tools = () => {
    
    function toolsSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    console.log('toolsSubmitHandler');
  }

    return (
      <div className="hs-tools">
        <form onSubmit={void(0)} className="hs-tools-form">

          <div class="hs-tool-grid-container">
            <div class="hs-tool-grid-columns">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="chooseColumns" classNamew="form-label">Columns</label>
                <input id="chooseColumns" minLength="4" maxLength="8" size="15" className="form-control" type="number"  placeholder="3" />
              </div>
            </div>
            <div class="hs-tool-grid-rows">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="chooseRows" classNamew="form-label">Rows</label>
                <input id="chooseRows" minLength="4" maxLength="8" size="15" className="form-control" type="number"  placeholder="3"  />
              </div>
            </div>
            <div class="hs-tool-grid-width">
              <div className="form-group align-items-center px-3 justify-content-center text-center">
                <label htmlFor="width" classNamew="form-label">Width</label>
                <input id="width" type="text" minLength="1" maxLength="8" size="15" className="form-control" placeholder="100%" />
              </div>
            </div>
            <div class="hs-tool-grid-height">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="height" classNamew="form-label">Height</label>
                <input id="height" type="text" minLength="1" maxLength="8" size="15" className="form-control" placeholder="100%" />
              </div>
            </div>
            <div class="hs-tool-grid-button px-3 justify-content-center d-inline-flex align-items-end">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

 