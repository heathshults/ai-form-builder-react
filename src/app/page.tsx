import FormBuilderPrompt from '@components/form-builder-prompt';
import './globals.scss';

export default function Home() {
  return (
    <>
      <div class="hs-form-builder-container">
        <div class="hs-form-display"></div>
        <div class="hs-form-builder-prompt">
          <FormBuilderPrompt />
        </div>
    </div>
    </>
  );
}
