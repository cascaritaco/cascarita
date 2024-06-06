export type DroppedItemType =
  | "short_text"
  | "long_text"
  | "dropdown"
  | "multiple_choice";

export interface DroppedItem {
  id: string;
  type: DroppedItemType;
}

export interface DNDCanvasRef {
  submitForm: () => void;
}
