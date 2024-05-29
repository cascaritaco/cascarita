import { Control } from "react-hook-form";
import { Field } from "../DNDCanvas/types";

export interface DraggableLongTextProps {
  id: string;
  index: number;
  title: string;
  control: Control<{ fields: Field[] }>;
  onDelete: () => void;
}