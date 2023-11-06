import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editRow } from '../../../store/tableSlice';
import DropdownButton from '../DropdownButton/DropdownButton';
import Input from '../Input/Input';
import Draggable from 'react-draggable';
import './FormModal.scss';
import { RowData } from '../../../types/RowData';
import { ModalProps } from '../../../types/Modal';

const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, data, chosenData }) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<RowData>(data);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editRow({ id: formData.id, newData: formData, chosenData }));
    onClose();
  };

  const handleDropdownChange = (selectedValue: string) => {
    setSelectedDropdownValue(selectedValue);
    setFormData({ ...formData, city: selectedValue });
  };
  
  if (!isOpen) return null;

  return (
    <Draggable cancel=".modal-content" nodeRef={nodeRef}>
      <div ref={nodeRef} className="modal form-container">
        <div className="modal-header">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required={true}
              />
              <Input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                required={true}
              />
              <Input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                required={true}
              />
              <DropdownButton
                options={['Riga', 'Daugavpils', 'Jūrmala', 'Ventspils']}
                onSelect={handleDropdownChange}
                placeholder="City"
                selectedValue={formData.city || selectedDropdownValue}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FormModal;
