import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children: React.ReactNode | React.ReactNode[];
  id: string;
}

export const Droppable: React.FC<DroppableProps> = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    width: "500px", // Adjust the width as needed
    height: "500px", // Adjust the height as needed
    border: "2px dashed #ccc", // Optional: Add a border to visualize the droppable area
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
