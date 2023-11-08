import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RowData } from "../types/RowData";
import { TableState } from "../types/TableState";

const initialState: TableState = {
  data: [],
  clonedData: [],
  isCloneVisible: false,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<RowData>) => {
      state.data.push(action.payload);
    },
    deleteRow: (
      state,
      action: PayloadAction<{ id: number; chosenData: string }>
    ) => {
      const { chosenData } = action.payload;
      state[chosenData] = state[chosenData].filter(
        (row) => row.id !== action.payload.id
      );
    },
    editRow: (
      state,
      action: PayloadAction<{
        id: number;
        newData: RowData;
        chosenData: string;
      }>
    ) => {
      const { id, newData, chosenData } = action.payload;
      const index = state[chosenData].findIndex(
        (row: RowData) => row.id === id
      );
      if (index !== -1) {
        state[chosenData][index] = { ...state[chosenData][index], ...newData };
      }
    },
    addClonedData: (state, action: PayloadAction<RowData[]>) => {
      state.clonedData = action.payload;
    },
    setIsCloneVisible: (state, action) => {
      state.isCloneVisible = action.payload;
    },
  },
});

export const { addRow, deleteRow, editRow, addClonedData, setIsCloneVisible } =
  tableSlice.actions;

export const selectTableData = (state: RootState) => state.table.data;
export const selectClonedTableData = (state: RootState) =>
  state.table.clonedData;
export const isCloneVisible = (state: RootState) => state.table.isCloneVisible;

export default tableSlice.reducer;
