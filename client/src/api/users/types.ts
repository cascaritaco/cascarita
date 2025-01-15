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

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  group_id: number;
  role_id: number;
  language_id: number;
}

export interface RegisterUser {
  group_id: string | number | null; // they might be joining an existing group
  name: string | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  logoUrl: string | null; // still need to set up s3 buckets for images so for now we wont collect this and just set it to null
  token: string | null;
}

export interface RegisterUserData {
  formData: RegisterUser;
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
