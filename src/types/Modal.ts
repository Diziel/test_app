import { RowData } from "./RowData";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RowData;
  chosenData: string;
}