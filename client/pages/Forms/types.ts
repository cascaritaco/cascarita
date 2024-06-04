import { Field } from "../../components/DNDCanvas/types";

export interface Form {
  id: string;
  edittedBy: string;
  lastUpdated: string;
  title: string;
  description: string;
  link: string;
  fields: Field[];
}
