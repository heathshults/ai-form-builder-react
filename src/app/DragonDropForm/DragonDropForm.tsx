/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { useDnDFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import { FormProvider } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import FormGrid from '@app/DragonDropForm/DragonDropFormGrid/DragonDropFormGrid';
import AddFieldForm from '@app/DragonDropForm/AddFieldForm/AddFieldForm';
import FormDisplay from '@app/DragonDropForm/AddFieldFormDisplay/AddFieldFormDisplay';
import './DragonDropForm.scss';


interface DragonDropFormProps {
  children?: React.ReactNode
};

export const DragonDropForm = ({children}: DragonDropFormProps) => {
    const { saveLayout } = useDnDFormContext();

    return (
      <FormProvider>
        <div>
          <h1>Form Builder</h1>
          <AddFieldForm />
          <FormGrid />
          <FormDisplay />
          <button onClick={saveLayout}>Save Layout</button>
        </div>
      </FormProvider>
    );
  };

  export default DragonDropForm;