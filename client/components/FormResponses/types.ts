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
  date?: string;
  boolean?: boolean;
  choice?: { label: string };
  choices?: { labels: string[] };
  file_url?: string;
}
