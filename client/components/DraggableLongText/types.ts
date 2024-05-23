import { Control } from "react-hook-form";
import { Field } from "../DNDCanvas/types";

export interface DraggableLongTextProps {
  id: string;
  index: number;
  question: string;
  label: string;
  control: Control<{ questions: Field[] }>;
  onDelete: () => void;
}
