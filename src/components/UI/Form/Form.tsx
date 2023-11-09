import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRow } from "../../../store/tableSlice";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import "./Form.scss";
import { FormData } from "../../../types/FormData";

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    age: "",
    city: "",
  });
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>("");
  const [isDisable, setDisable] = useState<boolean>(true);
  const [inputError, setInputError] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as FormData);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addRow({ ...formData, id: Math.random() }));
    setFormData({ name: "", surname: "", age: "", city: "" });
    setSelectedDropdownValue("");
  };

  const handleDropdownChange = (selectedValue: string) => {
    setSelectedDropdownValue(selectedValue);
    setFormData({ ...formData, city: selectedValue } as FormData);
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

  return (
    <form className="form" onSubmit={handleSubmit}>
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
        selectedValue={selectedDropdownValue}
      />
      <Button 
        type="submit" 
        label="ADD" 
        disabled={isDisable || inputError}
      />
    </form>
  );
};

export default Form;
