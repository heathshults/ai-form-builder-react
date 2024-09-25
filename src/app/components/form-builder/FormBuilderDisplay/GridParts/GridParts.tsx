/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { memo, useCallback, useState, CSSProperties } from 'react'
import { useDrop } from 'react-dnd'
import { DnDFormGroupTypes } from '@app/types'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import { useConfigContext } from '@context/ConfigContext';
import { addToLoaclStorage } from '@api/fetcher';
import './GridParts.scss';

// export const config = { col: 1, row: 4, width: '100%', height: '100%' };


export class Config extends React.Component {
  config = useConfigContext();
  col: number
  row: number
  width: string 
  height: string

  constructor(props) {
    super(props);
    console.log('config Grid Parts', this.config[0]);
    this.col = this.config[0].col;
    this.row = this.config[0].row;
    this.width = this.config[0].width; 
    this.height = this.config[0].height;

    this.state = {
      config: {...this.config},
    };
    console.log('config', this.config);
  }

  setConfig(newConfig) {
    this.setState({config: newConfig});
  }

 render() {
    return(<></>)
  }
}
const {col, row, width, height} = Config;
export const css = {
  hsFormbuilderGrid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    // gridTemplateRows: `repeat(${row}, 1fr)`,
    gridTemplateRows: `auto`,
    gridGap: '1rem',
    marginTop: '1rem',
    color: 'var(--text-color)',
    backgroundColor: 'var(--background-color)',
    maxWidth: '100%',
    height: '100vh',
    height: '100%',
  },
  hsFormbuilderGridRow: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gridRow: 'auto',
    padding: 0,
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
  hsFormbuilderGridItem: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 100%',
    justifyContent: 'center',
    alignItems: 'center',
    gridArea: 'auto',
    padding: '1rem',
    margin: '.25rem',
    border: '1px solid #ccc',
    backgroundColor: '#191919',
    width: '100%',
    // minWidth: '50px',
    // maxWidth: '100%',
    boxSizing: 'border-box',
  },
  'hsFormbuilderGridItem:lastChild)': {
    marginBottom: 0,
  },
  hsFormbuilderGridCanvas: {
    padding: '2rem',
    margin: 'auto',
  },
  hsFormbuilderGridFormgroup: {
    color: 'var(--text-color)',
    
  }

}


export const GridParts = ({ children }: GridPartsProps) => {
  return (
    <>
      {children}
    </>
  );
};

export const GridCanvas = ({ children }: IDragonDropGridCanvas) => {
  return (<>
    <div className="container hs-formbuilder-grid-canvas p-0 m-0" style={css.hsFormbuilderGridCanvas}>
      {children}
    </div>
  </>)
}


export const GridRow = ({ children }: { children: React.ReactNode }) => (
  <div className="hs-formbuilder-grid-row" style={css.hsFormbuilderGridRow}>{children}</div>
);

export const GridItem = ({ children }: GridPartsProps) => 
  <div className="hs-formbuilder-grid-item" style={css.hsFormbuilderGridItem}>{children}</div>;

export const GridContainer = ({ children, col, row }: IDragonDropGridContainer) => {
  const gridColumns = Array.from({ length: col });
  const gridRows = Array.from({ length: row });
  const [ dndFormGroups, setDnDFormGroups ] = useState(DnDFormGroupTypes)

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

  const [ , drop ] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))



  return (
    <>
      <Tools />
      <GridCanvas width={width} height={height} >
        <div className="hs-formbuilder-grid pt-3" style={css.hsFormbuilderGrid}>
          {children}
        </div>
      </GridCanvas>
    </>
  );
};
export default GridContainer;

export interface ITools {
  cols?: number;
  rows?: number;
  width?: number;
  height?: number;
}

export const Tools = ({cols, rows, width, height}: ITools): React.FC => {
  const configCtx = useConfigContext();
  console.log('tools configCtx', configCtx)
  const [config, setConfig] = React.useState(configCtx);
  const window: Window & typeof globalThis = globalThis; 
  const store =React.useRef(null)

  React.useEffect(()=>{
   store.current = window.localStorage; 
  }, [window.localStorage])
  const toolsSubmitHandler = React.useCallback((event: React.FormEvent) => {
      let form
      event.preventDefault();
      event.target ? form = event.target as HTMLFormElement : void (0);
      form ? console.log(form.elements!) : void (0);
  
      const settings = {
        col: form.elements[0].value,
        row: form.elements[1].value,
        width: form.elements[2].value,
        height: form.elements[3].value,
      }
     
      configCtx.setConfigContext(settings);
      store.current.removeItem('config');
      store.current.setItem('config', JSON.stringify(settings));
  
      console.log(configCtx);
      console.log(form.elements);
  }, [store, configCtx]);

  return (
    <div className="hs-tools">
      { console.log('config', JSON.stringify(config)) }
      <form onSubmit={toolsSubmitHandler} className="hs-tools-form">

        <div className="hs-tool-grid-container">
          <div className="hs-tool-grid-columns">
            <div className="form-group align-items-center text-center px-3 justify-content-center">
              <label htmlFor="chooseColumns" className="form-label">Columns</label>
              <input 
                id="chooseColumns" 
                minLength="4" 
                maxLength="8" 
                size="15" 
                className="form-control" 
                type="number" 
                placeholder="3" 
                defaultValue={config.col}
                onChange={(e) => setConfig({...config, col: e.target.value})}
              />
            </div>
          </div>
          <div className="hs-tool-grid-rows">
            <div className="form-group align-items-center text-center px-3 justify-content-center">
              <label htmlFor="chooseRows" className="form-label">Rows</label>
              <input 
                id="chooseRows" 
                minLength="4" 
                maxLength="8" 
                size="15" 
                className="form-control" 
                type="number" placeholder="3" 
                defaultValue={config.row}
              />
            </div>
          </div>
          <div className="hs-tool-grid-width">
            <div className="form-group align-items-center px-3 justify-content-center text-center">
              <label htmlFor="width" className="form-label">Width</label>
              <input 
                id="width" 
                type="text" 
                minLength="1" 
                maxLength="8" 
                size="15" 
                className="form-control" 
                placeholder="100%"
                defaultValue={config.width}
                
                
              />
            </div>
          </div>
          <div className="hs-tool-grid-height">
            <div className="form-group align-items-center text-center px-3 justify-content-center">
              <label htmlFor="height" className="form-label">Height</label>
              <input 
                id="height" 
                type="text" 
                minLength="1" 
                maxLength="8" 
                size="15" 
                className="form-control" 
                placeholder="100%"
                defaultValue={config.height}
              />
            </div>
          </div>
          <div className="hs-tool-grid-button px-3 justify-content-center d-inline-flex align-items-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}

