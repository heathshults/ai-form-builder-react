/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { createContext, useContext, useState, ReactNode,  } from 'react';


// export const config = { col: 1, row: 4, width: '100%', height: '100%' };

interface ConfigContextType {
  col: number;
  row: number;
  width: string;
  height: string;
  setConfigContext: (newConfig: ConfigContextType) => void;
}


  const defaultConfig = { col: 1, row: 4, width: '100%', height: '100%' };
  
// create the config context
export const ConfigContext = createContext<ConfigContextType | undefined>(defaultConfig);

// create the config provider
export const ConfigProvider = (props) => {
  const { children } = props
const [config, setConfig] = useState<ConfigContextType>(defaultConfig);

  React.useEffect(()=>{
    const dataStore = window.localStorage;
  
    if (dataStore) {
      const configData = dataStore.getItem('config');
      if (configData) {
        setConfig(JSON.parse(configData));
      }
    }

  }, [])
  
  const setConfigContext = (newConfig: ConfigContextType) => {
    if (typeof newConfig === ConfigContext) 
      setConfig(newConfig);
  }
  

    return (
      <>
      
        <ConfigContext.Provider value={{ ...config, setConfigContext: setConfigContext }}>
          {children}
        </ConfigContext.Provider>
      </>
    );
  
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
};

  export default ConfigContext;