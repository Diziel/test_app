export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  onClick?: () => void;
  className?: string;
}
