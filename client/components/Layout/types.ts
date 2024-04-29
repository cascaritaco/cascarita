export interface LayoutProps {
  children: React.ReactNode;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}
