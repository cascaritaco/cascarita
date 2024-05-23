import { Control } from "react-hook-form";
import { Field } from "../DNDCanvas/types";

export interface Option {
  id: string;
  value: string;
}

export interface DraggableDropdownProps {
  id: string;
  index: number;
  question: string;
  control: Control<{ questions: Field[] }>; // Type as appropriate
  onDelete: () => void;
}
