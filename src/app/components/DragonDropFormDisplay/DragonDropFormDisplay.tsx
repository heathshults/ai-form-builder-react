// components/FormDisplay.tsx
import React from 'react';
import { useFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

const FormDisplay: React.FC = () => {
  const { fields } = useFormContext();

  return (
    <form>
      {fields.map((field) => (
        <div key={field.id}>
          <label>
            {field.label}
            {field.type === 'select' ? (
              <select name={field.label}>
                <option value="">Select...</option>
              </select>
            ) : field.type === 'radio' ? (
              <input type="radio" name={field.label} />
            ) : field.type === 'checkbox' ? (
              <input type="checkbox" name={field.label} />
            ) : (
              <input type={field.type} name={field.label} />
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default FormDisplay;
