import { Control } from "react-hook-form";
import { Field } from "../DNDCanvas/types";

export interface DraggableMultipleChoiceProps {
  id: string;
  index: number;
  title: string;
  control: Control<{ fields: Field[] }>; // Type as appropriate
  onDelete: () => void;
  onCopy: () => void;
}
