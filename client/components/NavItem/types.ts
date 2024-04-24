export interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onItemClick: (label: string) => void;
}
