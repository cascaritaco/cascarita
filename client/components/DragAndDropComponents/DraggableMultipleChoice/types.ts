import { Control } from "react-hook-form";
import { Field, Properties, Validation } from "../DNDCanvas/types";

export interface DraggableMultipleChoiceProps {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  properties: Properties | undefined;
  control: Control<{ fields: Field[] }>; // Type as appropriate
  onDelete: () => void;
  onCopy: () => void;
}
