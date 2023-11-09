import { RowData } from "./RowData";

export interface InputProps {
  type: string;
  placeholder: string;
  name: keyof RowData;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  onErrorChange: (error: boolean) => void;
}
