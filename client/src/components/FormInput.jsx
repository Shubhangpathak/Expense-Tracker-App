import React from "react";

function FormInput({ type, placeholder, value, onChange }) {
  return (
    <input
      className="border px-8 py-4 rounded-3xl"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default FormInput;
