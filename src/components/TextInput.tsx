import React from 'react';

interface UpdateValue {
  type: string;
  value: string;
}

export interface InputProps {
  slug: string;
  label: string;
  placeholder?: string;
  value: string;
  updateValue: (obj: UpdateValue) => void;
}

function TextInput({
  slug,
  label,
  placeholder,
  value,
  updateValue,
}: InputProps) {
  return (
    <>
      <label htmlFor={slug}>{label}</label>
      <input
        type="text"
        id={slug}
        name={slug}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => updateValue({ type: slug, value: e.target.value })}
      />
    </>
  );
}

export default TextInput;
