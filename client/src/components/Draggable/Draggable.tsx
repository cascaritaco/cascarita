import { useDraggable } from "@dnd-kit/core";
import styled from "styled-components";
import { CSS } from "@dnd-kit/utilities";

interface DraggableProps {
  children: React.ReactNode | React.ReactNode[];
  id: string;
}

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: grab;
  font-size: 16px;
  transition: transform 0.2s ease;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

export const Draggable: React.FC<DraggableProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <StyledButton ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </StyledButton>
  );
};
