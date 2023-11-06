import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { deleteRow } from '../../../store/tableSlice';
import FormModal from '../FormModal/FormModal';
import './Table.scss'
import CloneButton from '../CloneButton/CloneButton';
import { RowData } from '../../../types/RowData';

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tableData: RowData[] = useSelector((state: RootState) => state.table.data);
  const [editModalData, setEditModalData] = useState<RowData | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteRow({ id, chosenData: 'data' }));
  };

  const handleEdit = (rowData: RowData) => {
    setEditModalData(rowData);
  };

  return (
    <div className='table-container'>
      <div className='clone-button-container'>
        <CloneButton/>
      </div>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: RowData) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
              <td>
                <div className='action'>
                  <button className='edit-button' onClick={() => handleEdit(row)}>Edit</button>
                  <button className='delete-button' onClick={() => handleDelete(row.id)}>Delete</button>
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
          chosenData='data'
        />
      )}
    </div>
  );
};

export default Table;
