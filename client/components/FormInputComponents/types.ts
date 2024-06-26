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
  id: string;
  label: string;
  ref: string;
}

export interface Properties {
  choices?: Label[];
  default_country_code?: string;
}

export interface Field {
  id: string;
  title: string;
  ref: string;
  validations?: Validation;
  properties?: Properties;
  type: FieldType;
}

export interface Answer {
  field: {
    id: string;
    type: string;
    ref: string;
  };
  type: string;
  number?: number;
  text?: string;
  phone_number?: string;
  email?: string;
  date?: Date;
  boolean?: boolean;
  choice?: { label: string };
  choices?: { labels: string[] };
  file_url?: string;
}

export interface FieldProps {
  field: Field;
  index: number;
}
