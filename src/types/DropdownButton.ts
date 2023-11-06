export interface DropdownButtonProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
  selectedValue: string; 
}