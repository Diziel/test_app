import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { DropdownButtonProps } from '../../../types/DropdownButton';
import './DropdownButton.scss';

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
        className={`dropdown__button ${selectedValue ? 'selected' : ''} ${isOpen} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || placeholder}
      </button>
      <animated.div style={dropdownAnimation} className="dropdown__list">
        {isOpen &&
          options.map((option, index) => (
            <div
              key={index}
              className="dropdown__list-item"
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
