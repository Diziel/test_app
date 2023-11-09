import React, { useState } from "react";
import "./Input.scss";
import { InputProps } from "../../../types/Input";

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  onChange,
  required,
  value,
  onErrorChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    let inputError = "";

    if (required && !value) {
      inputError = `${name} is required`;
    } else if (name === "name" && !/^\S+$/.test(value.toString())) {
      inputError = "Name should not contain any spaces";
    } else if (name === "surname" && !/^\S+$/.test(value.toString())) {
      inputError = "Surname should not contain any spaces";
    } else if (
      name === "age" &&
      (isNaN(Number(value)) || Number(value) < 1 || Number(value) > 150)
    ) {
      inputError = "Age should be a number between 1 and 150";
    }

    setError(inputError);
    onErrorChange(!inputError);
  };

  return (
    <div>
      {error && <span className="validation-error">{error}</span>}
      <input
        className="input"
        type={type}
        placeholder={isFocused ? "" : placeholder}
        name={name}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
