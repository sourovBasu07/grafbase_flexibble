import React from "react";

const FormField = ({
  title,
  isTextArea,
  placeholder,
  type,
  state,
  setState,
}) => {
  return (
    <div className="flexStart w-full flex-col gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
