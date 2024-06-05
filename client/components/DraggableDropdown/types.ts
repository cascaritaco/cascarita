import { Control } from "react-hook-form";
import { Field, Validation } from "../DNDCanvas/types";

export interface Option {
  ref: string;
  label: string;
}

export interface DraggableDropdownProps {
  id: string;
  index: number;
  validations: Validation | undefined;
  title: string;
  control: Control<{ fields: Field[] }>; // Type as appropriate
  onDelete: () => void;
  onCopy: () => void;
}
