// components/AddFieldForm.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFormContext } from '@context/DragonDropFormFieldContext/DragonDropFormFieldContext';

const AddFieldForm: React.FC = () => {
  const { addField } = useFormContext();
  const [type, setType] = useState('text');
  const [label, setLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addField({
      id: uuidv4(),
      type,
      label,
    });
    setLabel('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="select">Select</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
      </select>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Field label"
        required
      />
      <button type="submit">Add Field</button>
    </form>
  );
};

export default AddFieldForm;
