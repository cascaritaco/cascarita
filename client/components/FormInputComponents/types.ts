export type FieldType =
  | "multiple_choice"
  | "short_text"
  | "long_text"
  | "dropdown"
  | "email"
  | "phone_number";

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
  default_country_code?: string;
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

export interface FieldProps {
  field: Field;
}
