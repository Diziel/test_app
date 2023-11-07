import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRow, selectClonedTableData, addClonedData, setIsCloneVisible } from '../../../store/tableSlice';
import FormModal from '../FormModal/FormModal';
import Button from '../Button/Button';
import './CloneTable.scss';
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
    <div className='container'>
      <div className='container__header'>
        <Button className="delete-table-button" onClick={handleDeleteTable} label='&times;' disabled={false} type='button' />
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
          {clonedTableData.map((row: RowData) => (
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
          chosenData='clonedData'
        />
      )}
    </div>
  ) : null;
};

export default CloneTable;
