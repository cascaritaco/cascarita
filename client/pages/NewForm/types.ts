export type DroppedItemType =
  | "short_text"
  | "long_text"
  | "dropdown"
  | "multiple_choice"
  | "email"
  | "phone_number"
  | "payment";

export interface DroppedItem {
  id: string;
  type: DroppedItemType;
}

export interface DNDCanvasRef {
  submitForm: () => void;
}
