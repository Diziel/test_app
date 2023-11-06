import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './DropdownButton.scss';
import { DropdownButtonProps } from '../../../types/DropdownButton';

const DropdownButton: React.FC<DropdownButtonProps> = ({ options, onSelect, placeholder, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    marginTop: isOpen ? 0 : -10,
  });

  const handleItemClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className={`dropdown-button ${isOpen} ${selectedValue ? 'selected' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
      </button>
      <animated.div style={dropdownAnimation} className="dropdown-list">
        {isOpen &&
          options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleItemClick(option)}
            >
              {option}
            </div>
          ))}
      </animated.div>
    </div>
  );
};

export default DropdownButton;
