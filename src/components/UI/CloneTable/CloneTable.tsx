import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRow, selectClonedTableData, addClonedData, setIsCloneVisible } from '../../../store/tableSlice';
import FormModal from '../FormModal/FormModal';
import Button from '../Button/Button';
import '../Table/Table.scss';
import { RowData } from '../../../types/RowData';

interface CloneTableProps {
  tableData: RowData[] | null;
}

const CloneTable: React.FC<CloneTableProps> = ({ tableData }) => {
  const dispatch = useDispatch();
  const clonedTableData = useSelector(selectClonedTableData);
  const [editModalData, setEditModalData] = useState<RowData | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteRow({ id, chosenData: 'clonedData' }));
  };

  const handleEdit = (rowData: RowData) => {
    setEditModalData(rowData);
  };

  const handleDeleteTable = () => {
    dispatch(setIsCloneVisible(false))
    setTimeout(() => {
      dispatch(addClonedData([]));
    }, 500);
  };

  return tableData && tableData.length ? (
    <div className='table-container'>
      <div className='header'>
        <Button className="delete-table-button" onClick={handleDeleteTable} label='&times;' disabled={false} type='button' />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clonedTableData.map((row: RowData) => (
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
          chosenData='clonedData'
        />
      )}
    </div>
  ) : null;
};

export default CloneTable;
