import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { DropdownProps } from "../../../types/Dropdown";
import "./Dropdown.scss";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder,
  selectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    marginTop: isOpen ? 0 : -10,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown__button ${selectedValue ? "selected" : ""} ${
          isOpen ? "open" : ""
        }`}
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

export default Dropdown;
