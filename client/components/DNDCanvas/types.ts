import { DroppedItem } from "../../pages/NewForm/types";

export type FieldType =
  | "Multiple Choice"
  | "Short Text"
  | "Long Text"
  | "Dropdown";

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  question?: string;
  label?: string;
  longText?: string;
  options?: { id: string; value: string }[];
}

export interface Survey {
  questions: Field[];
}

export interface DNDCanvasProps {
  items: DroppedItem[];
  handleDelete: (name: string) => void;
  saveSurvey: (data: Survey) => void;
}
