import { Control } from "react-hook-form";
import { Field, Properties, Validation } from "../DNDCanvas/types";

export interface DraggableEmailProps {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  properties: Properties | undefined;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
  onCopy: () => void;
}
