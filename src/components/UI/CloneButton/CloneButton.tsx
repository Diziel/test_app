import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTableData,
  addClonedData,
  setIsCloneVisible,
} from "../../../store/tableSlice";
import Button from "../Button/Button";
import "./CloneButton.scss";

const CloneButton: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);

  const handleClone = () => {
    const currentTableData = JSON.parse(JSON.stringify(tableData));
    dispatch(addClonedData(currentTableData));
    dispatch(setIsCloneVisible(true));
  };

  return (
    <Button
      className="clone-button"
      onClick={handleClone}
      label="Clone Table"
      type="button"
      disabled={!tableData.length}
    />
  );
};

export default CloneButton;
