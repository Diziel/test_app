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
    <div className='container'>
      <div className='container__header'>
        <CloneButton/>
      </div>
      <table className='table'>
        <thead className='table__header'>
          <tr>
            <th className='table__header-th'>Name</th>
            <th className='table__header-th'>Surname</th>
            <th className='table__header-th'>Age</th>
            <th className='table__header-th'>City</th>
            <th className='table__header-th'></th>
          </tr>
        </thead>
        <tbody className='table__body'>
          {tableData.map((row: RowData) => (
            <tr className='table__body-tr' key={row.id}>
              <td className='table__body-td'>{row.name}</td>
              <td className='table__body-td'>{row.surname}</td>
              <td className='table__body-td'>{row.age}</td>
              <td className='table__body-td'>{row.city}</td>
              <td className='table__body-td'>
                <div className='table__body-td--action'>
                  <button className='button button-edit' onClick={() => handleEdit(row)}>Edit</button>
                  <button className='button button-delete' onClick={() => handleDelete(row.id)}>Delete</button>
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
