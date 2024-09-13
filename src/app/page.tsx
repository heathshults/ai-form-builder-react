import FormBuilderPrompt from '@app/components/form-builder/form-builder-prompt';
import FormBuilderDisplay from '@app/components/form-builder/FormBuilderDisplay';
import { FormFieldsProvider } from '@context/FormFieldsContext/FormFieldsContext';
import { FormProvider } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

import './globals.scss';

export default function Home() {
  return (
    <>
    <FormProvider>
      <FormFieldsProvider>
        <div className="hs-form-builder-container">
          <div className="hs-form-display">
            <FormBuilderDisplay />
          </div>
          <div className="hs-form-builder-prompt">
            <FormBuilderPrompt />
          </div>
      </div>
      </FormFieldsProvider>
    </FormProvider>
    </>
  );
}
