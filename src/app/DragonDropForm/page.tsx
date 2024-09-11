import DragonDropForm from "./DragonDropForm"
import { FormProvider } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

export default function Page() {
  return (
  <>
    <FormProvider><DragonDropForm/></FormProvider>
  </>  
)
}