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
  allow_multiple_selection?: boolean;
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

export interface WelcomeScreen {
  id: string;
  ref: string;
  title: string;
  properties: {
    show_button: boolean;
    button_text: string;
    description: string;
  };
}

export interface Form {
  _id: string;
  created_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  updated_by: {
    id: string;
    first_name: string;
    last_name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  form_data: {
    id: string;
    title: string;
    _links: {
      display: string;
      responses: string;
    };
    fields: Field[];
  };
  welcome_screen: WelcomeScreen;
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
