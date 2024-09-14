/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// export const config = { col: 1, row: 4, width: '100%', height: '100%' };

interface ConfigContextProps {
  children: React.ReactNode
};

interface ConfigContextType {
  col: number;
  row: number;
  width: string;
  height: string;
  setConfigContext: (newConfig: ConfigContextType) => void;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export class ConfigProvider extends React.Component<ConfigContextProps> {
  config: ConfigContextType;
  state = {
    config: { col: 1, row: 4, width: '100%', height: '100%' }
  };

  constructor(props) {
    super(props);
    this.config = this.state.config;
  }
  
  setConfigContext = (newConfig: ConfigContextType) => {
    this.setState({
      config: newConfig
    });
  }
  
  render() {
    return (
      <ConfigContext.Provider value={{ ...this.state.config, setConfigContext: this.setConfigContext }}>
        {this.props.children}
      </ConfigContext.Provider>
    );
  }
};

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
};

  export default ConfigContext;