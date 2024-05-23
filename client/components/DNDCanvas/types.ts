import { DroppedItem } from "../../pages/NewForm/types";

export interface DNDCanvasProps {
  items: DroppedItem[];
  handleDelete: (name: string) => void;
}
