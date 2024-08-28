import { DroppedItem } from "../../../pages/NewForm/types";

export type FieldType =
  | "multiple_choice"
  | "short_text"
  | "long_text"
  | "dropdown"
  | "email"
  | "phone_number"
  | "payment";

export interface Validation {
  max_length?: number;
  required: boolean;
}

export interface Label {
  label: string;
  ref: string;
}

export interface Properties {
  choices?: Label[];
  allow_multiple_selection?: boolean;
  default_country_code?: string;
  description?: string;
  price?: {
    type: string;
    value: string;
    currency: string;
  };
}

export interface Field {
  // NOTE: See comment in DNDCanvas.tsx
  id?: string;
  title: string;
  ref: string;
  validations?: Validation;
  properties?: Properties;
  type: FieldType;
}

export interface Form {
  fields: Field[];
}

export interface DNDCanvasProps {
  items: DroppedItem[];
  importedFields?: Field[];
  handleDelete: (name: string) => void;
  handleCopy: (index: number, copiedItem: DroppedItem) => void;
  saveForm: (data: Form) => void;
}
