import { Control } from "react-hook-form";
import { Field } from "../DNDCanvas/types";

export interface DraggableMultipleChoiceProps {
  id: string;
  index: number;
  question: string;
  control: Control<{ questions: Field[] }>; // Type as appropriate
  onDelete: () => void;
}
