export type DraggableButtonKeys =
  | "draggableButtons.Short Text"
  | "draggableButtons.Long Text"
  | "draggableButtons.Dropdown"
  | "draggableButtons.Multiple Choice"
  | "draggableButtons.Email"
  | "draggableButtons.Phone Number";

export interface DraggableButtonProps {
  label: string;
  onDrop: () => void;
}
