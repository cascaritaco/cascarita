export type DroppedItemType =
  | "Short Text"
  | "Long Text"
  | "Dropdown"
  | "Multiple Choice"
  | "Signature";

export interface DroppedItem {
  id: string;
  type: DroppedItemType;
}
