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

export interface Form {
  fields: Field[];
}

type SortBy = "created_at" | "last_updated_at";

type OrderBy = "asc" | "desc";

export interface GetFormsParams {
  page?: number;
  page_size?: number;
  search?: string | null;
  workspace_id?: string | null;
  sort_by?: SortBy | null;
  order_by?: OrderBy | null;
}

export type AnswerType =
  | "text"
  | "number"
  | "date"
  | "choice"
  | "choices"
  | "email"
  | "phone_number"
  | "boolean"
  | "file_url";

export interface Answer {
  field: {
    id: string;
    type: string;
    ref: string;
  };
  type: AnswerType;
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
