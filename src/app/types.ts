export interface ICompoundFields {
  location?: {
    address?: { type: string; label: string };
    address2?: { type: string; label: string };
    city?: { type: string; label: string };
    state?: { type: string; options: string[]; label: string };
    zip?: { type: string; label: string };
  };
  name?: ['firstName', 'middleName', 'lastName'];
}

export const DnDFormGroupTypes = {
  DNDFORMGROUP: 'formgroup',
}

export interface IFieldTypes {
  type: 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'compound';
}


export interface GridPartsProps {
  children: React.ReactNode
};
export interface IDragonDropGrid {
  children?: React.ReactNode
};
export interface IDragonDropGridContainer {
  children?: React.ReactNode
  col: number;
  row: number;
};

export interface IDragonDropGridCanvas {
  children?: React.ReactNode
  width?: number | string;
  height?: number | string;
};

export interface Field {
  id: string;
  type: string;
  name: string;
  label: string;
}

export interface FormFieldsContextType {
  fields: Field[];
  addField: (field: Field) => void;
  removeField: (name: string) => void;
  setFields: (fieldsString: string) => void;
}

export interface FormFieldProps {
  type: string;
  id: string;
  name: string;
  label: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  options?: string[]; // For select fields
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  validationRegx?: RegExp;
  errorMessage?: string;
  style: React.CSSProperties;
  textareaHeight: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onclick?: (string) => void;
  [key: string]: undefined | string | number | boolean | string[] | RegExp | React.CSSProperties | ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) | ((string) => void);
}

// Event Bus

export interface ICallbackList {
  [id: string]: (...args: unknown[]) => void;
}

export interface IEventObject {
  [eventName: string]: ICallbackList;
}

export interface ISubscribe {
  unSubscribe: () => void;
}

export interface IEventBus {
  publish<T extends unknown[]>(eventName: string, ...args: T): void;
  subscribe(eventName: string, callback: ()=>void): ISubscribe;
  subscribeOnce(eventName: string, callback: ()=>void): ISubscribe;
  clear(eventName: string): void;
}