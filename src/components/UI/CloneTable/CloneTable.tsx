import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRow,
  selectClonedTableData,
  addClonedData,
  setIsCloneVisible,
} from "../../../store/tableSlice";
import FormModal from "../FormModal/FormModal";
import Button from "../Button/Button";
import "./CloneTable.scss";
import "../Table/Table.scss";
import { RowData } from "../../../types/RowData";

interface CloneTableProps {
  tableData: RowData[] | null;
}

const CloneTable: React.FC<CloneTableProps> = ({ tableData }) => {
  const dispatch = useDispatch();
  const clonedTableData = useSelector(selectClonedTableData);
  const [editModalData, setEditModalData] = useState<RowData | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteRow({ id, chosenData: "clonedData" }));
  };

  const handleEdit = (rowData: RowData) => {
    setEditModalData(rowData);
  };

  const handleDeleteTable = () => {
    dispatch(setIsCloneVisible(false));
    setTimeout(() => {
      dispatch(addClonedData([]));
    }, 500);
  };

  return tableData && tableData.length ? (
    <div className="container">
      <div className="container__header">
        <Button
          className="delete-table-button"
          onClick={handleDeleteTable}
          label="&times;"
          disabled={false}
          type="button"
        />
      </div>
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-cell">Name</th>
            <th className="table__header-cell">Surname</th>
            <th className="table__header-cell">Age</th>
            <th className="table__header-cell">City</th>
            <th className="table__header-cell"></th>
          </tr>
        </thead>
        <tbody className="table__body">
          {clonedTableData.map((row: RowData) => (
            <tr className="table__body-row" key={row.id}>
              <td className="table__body-cell">{row.name}</td>
              <td className="table__body-cell">{row.surname}</td>
              <td className="table__body-cell">{row.age}</td>
              <td className="table__body-cell">{row.city}</td>
              <td className="table__body-cell">
                <div className="table__body-cell--action">
                  <button
                    className="button button-edit"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="button button-delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editModalData && (
        <FormModal
          isOpen={true}
          onClose={() => setEditModalData(null)}
          data={editModalData}
          chosenData="clonedData"
        />
      )}
    </div>
  ) : null;
};

export default CloneTable;
