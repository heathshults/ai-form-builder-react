/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { useFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import { FormProvider } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import FormGrid from '@components/DragonDropFormGrid/DragonDropFormGrid';
import AddFieldForm from '@components/AddFieldForm/AddFieldForm';
import FormDisplay from '@components/DragonDropFormDisplay/DragonDropFormDisplay';
import './DragonDropForm.scss';


interface DragonDropFormProps {
  children?: React.ReactNode
};

export const DragonDropForm = ({children}: DragonDropFormProps) => {
    const { saveLayout } = useFormContext();

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