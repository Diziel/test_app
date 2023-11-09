import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { deleteRow } from "../../../store/tableSlice";
import FormModal from "../FormModal/FormModal";
import "./Table.scss";
import CloneButton from "../CloneButton/CloneButton";
import { RowData } from "../../../types/RowData";

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tableData: RowData[] = useSelector((state: RootState) => state.table.data);
  const [editModalData, setEditModalData] = useState<RowData | null>(null);

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteRow({ id, chosenData: "data" }));
  }, [dispatch]);

  const handleEdit = useCallback((rowData: RowData) => {
    setEditModalData(rowData);
  }, []);

  const memoizedTableData = useMemo(() => {
    return tableData.map((row: RowData) => (
      <tr className="table__body-row" key={row.id}>
        <td className="table__body-cell">{row.name}</td>
        <td className="table__body-cell">{row.surname}</td>
        <td className="table__body-cell">{row.age}</td>
        <td className="table__body-cell">{row.city}</td>
        <td className="table__body-cell">
          <div className="table__body-cell--action">
            <button className="button button-edit" onClick={() => handleEdit(row)}>
              Edit
            </button>
            <button className="button button-delete" onClick={() => handleDelete(row.id)}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    ));
  }, [tableData, handleEdit, handleDelete]);

  return (
    <div className="container">
      <div className="container__header">
        <CloneButton />
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
        <tbody className="table__body">{memoizedTableData}</tbody>
      </table>
      {editModalData && (
        <FormModal
          isOpen={true}
          onClose={() => setEditModalData(null)}
          data={editModalData}
          chosenData="data"
        />
      )}
    </div>
  );
};

export default Table;
