import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editRow } from "../../../store/tableSlice";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Draggable from "react-draggable";
import "./FormModal.scss";
import { RowData } from "../../../types/RowData";
import { ModalProps } from "../../../types/Modal";
import { FormData } from "../../../types/FormData";
import Button from "../Button/Button";

const FormModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  chosenData,
}) => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<RowData>(data);
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>("");
  const [isDisable, setDisable] = useState<boolean>(true);
  const [inputError, setInputError] = useState<boolean>(false);

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

  const isDisabledBtn = (data: FormData) => {
    for (const key in data) {
      if (!data[key as keyof FormData] || data[key as keyof FormData] === "") {
        setDisable(true);
        return;
      }
    }
    setDisable(false);
  };

  const handleErrorChange = (error: boolean) => {
    setInputError(!error);
  };

  useEffect(() => {
    isDisabledBtn(formData);
  }, [formData]);

  if (!isOpen) return null;

  return (
    <Draggable
      cancel=".form-modal, .modal__header-close"
      defaultPosition={{ x: 30, y: -400 }}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="modal">
        <div className="modal__header">
          <span className="modal__header-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form className="form-modal" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required={true}
            onErrorChange={handleErrorChange}
          />
          <Input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Surname"
            required={true}
            onErrorChange={handleErrorChange}
          />
          <Input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            required={true}
            onErrorChange={handleErrorChange}
          />
          <Dropdown
            options={["Riga", "Daugavpils", "Jūrmala", "Ventspils"]}
            onSelect={handleDropdownChange}
            placeholder="City"
            selectedValue={formData.city || selectedDropdownValue}
          />
          <Button 
            className="modal__button"
            type="submit"
            label="Save"
            disabled={isDisable || inputError}
          />
        </form>
      </div>
    </Draggable>
  );
};

export default FormModal;
