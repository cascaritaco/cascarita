import { DroppedItem } from "../../pages/NewForm/types";

export type FieldType =
  | "multiple_choice"
  | "short_text"
  | "long_text"
  | "dropdown";

export interface Validation {
  max_length?: number;
  required: boolean;
}

export interface Label {
  label: string;
  ref: string;
}

export interface Properties {
  choices: Label[];
}

export interface Field {
  // NOTE: See comment in DNDCanvas.tsx
  id?: string;
  ref: string;
  type: FieldType;
  title: string;
  validations?: Validation;
  properties?: Properties;
}

export interface Survey {
  fields: Field[];
}

export interface DNDCanvasProps {
  items: DroppedItem[];
  importedFields?: Field[];
  handleDelete: (name: string) => void;
  handleCopy: (index: number, copiedItem: DroppedItem) => void;
  saveSurvey: (data: Survey) => void;
}
