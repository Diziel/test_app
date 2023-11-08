export interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
  selectedValue: string;
}
