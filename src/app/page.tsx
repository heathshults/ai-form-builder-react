import FormBuilderPrompt from '@components/form-builder-prompt';
import FormBuilderDisplay from '@components/FormBuilderDisplay';
import FormFieldsProvider from '@context/FormFieldsContext';
import './globals.scss';

export default function Home() {
  return (
    <>
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
    </>
  );
}
