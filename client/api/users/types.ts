export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  group_id: number;
  role_id: number;
  language_id: number;
  created_at: Date;
  updated_at: Date;
}

export const LanguageCodeToLanguageId = {
  en: 1 as number,
  esp: 2 as number,
};

export const LanguageIdToLanguageCode = {
  1: "en" as string,
  2: "esp" as string,
};

interface LanguageType {
  en: string;
  esp: string;
}

export type { LanguageType };
