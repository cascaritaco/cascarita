export interface State {
  page: number;
  isExistingOrg: string;
  org: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  selectedOrg: string;
}

export type Action =
  | { type: "SET_FIELD"; field: keyof State; value: string | number }
  | { type: "NEXT_PAGE" }
  | { type: "PREVIOUS_PAGE" }
  | { type: "RESET_FORM" };
