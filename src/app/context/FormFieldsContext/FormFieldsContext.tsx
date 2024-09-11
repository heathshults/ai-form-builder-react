'use client'
import * as React from 'react';




export const fields: string [] = []

export const FormDataAndAction: IFormDataAndAction = {
  fields: [],
  addField: (field: string) => {
    fields.push(field)
  },
  removeField: (field: string) => {
    fields.splice(fields.indexOf(field), 1)
  }
}

export const FormFieldsContext = React.createContext(FormDataAndAction);

export default function FormFieldsProvider({children}: {children: React.ReactNode}) {
  const fieldsAndActions = React.useContext(FormFieldsContext)

  return(<>
    <FormFieldsContext.Provider value={{...fieldsAndActions}}>
      {children}
    </FormFieldsContext.Provider>
  
  </>)

}










