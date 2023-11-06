import React, { useState } from 'react';
import './Input.scss';
import { InputProps } from '../../../types/Input';

const Input: React.FC<InputProps> = ({ type, placeholder, name, onChange, required, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (required && !value) {
      setError(`${name} is required`);
    } else {
      setError('');
    }

    // Name validation (no spaces allowed)
    if (name === 'name' && !/^\S+$/.test(value.toString())) {
      setError('Name should not contain any spaces');
    }

    // Surname validation (no spaces allowed)
    if (name === 'surname' && !/^\S+$/.test(value.toString())) {
      setError('Surname should not contain any spaces');
    }

    // Age validation (only numbers from 1 to 150 allowed)
    if (name === 'age' && (isNaN(Number(value)) || value < 1 || value > 150)) {
      setError('Age should be a number between 1 and 150');
    }
  };

  return (
    <div>
      {error && <span className='validation-error'>{error}</span>}
      <input
        type={type}
        placeholder={isFocused ? '' : placeholder}
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
