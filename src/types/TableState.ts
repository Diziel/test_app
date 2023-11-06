import { RowData } from "./RowData";

export interface TableState {
  data: RowData[];
  clonedData: RowData[];
  isCloneVisible: boolean,
  [key: string]: any;
}