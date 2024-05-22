export type DroppedItemType =
  | "Section"
  | "Heading"
  | "Text"
  | "Date and Time"
  | "Numbers"
  | "Dropdown"
  | "Multiple Choice"
  | "Signature";

export interface DroppedItem {
  id: number;
  type: DroppedItemType;
}

export interface DNDCanvasProps {
  items: DroppedItem[];
  setItems: React.Dispatch<React.SetStateAction<DroppedItem[]>>;
}
