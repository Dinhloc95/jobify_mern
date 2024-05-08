import React from "react";

const FormRow = ({ type, name, labelName, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelName || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-input"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
