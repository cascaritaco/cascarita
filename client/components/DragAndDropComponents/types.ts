import { Control } from "react-hook-form";
import { Field, Properties, Validation } from "../../api/forms/types";

export interface DraggableProps {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
  onCopy: () => void;
}

export interface DraggablePropsWithProperties {
  id: string;
  index: number;
  title: string;
  validations: Validation | undefined;
  properties: Properties | undefined;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
  onCopy: () => void;
}
