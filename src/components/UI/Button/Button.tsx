import React from "react";
import "./Button.scss";
import { ButtonProps } from "../../../types/Button";

const Button: React.FC<ButtonProps> = ({
  label,
  type = undefined,
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
