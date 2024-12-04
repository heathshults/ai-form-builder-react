'usee client'
import FormBuilderPrompt from '@app/components/form-builder/form-builder-prompt';
import FormBuilderDisplay from '@app/components/form-builder/FormBuilderDisplay';
import { FormFieldsProvider } from '@context/FormFieldsContext/FormFieldsContext';
import { FormProvider } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';
import { ConfigProvider } from '@context/ConfigContext';
import ErrorBoundary from '@app/utils/ErrorBoundary';

export default function Home() {
  return (
    <>
      <FormProvider>
        <FormFieldsProvider>
  
            <ConfigProvider>
              <div className="hs-form-builder-container">
                <div className="hs-form-display">
                  <ErrorBoundary>
                   <FormBuilderDisplay ></FormBuilderDisplay>
                  </ErrorBoundary>
                </div>
                <div className="hs-form-builder-prompt">
                  <ErrorBoundary>
                    <FormBuilderPrompt />
                  </ErrorBoundary>
                </div>
              </div>
            </ConfigProvider>
  
        </FormFieldsProvider>
      </FormProvider>
    </>
  );
}
