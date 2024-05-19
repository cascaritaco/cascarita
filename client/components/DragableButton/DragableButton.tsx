import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useState } from "react";

interface DraggableButtonProps {
  onDrop: () => void;
}

const DraggableButton: React.FC<DraggableButtonProps> = ({ onDrop }) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    // Define the drop zone area (e.g., x: 100-300, y: 100-300)
    const dropZone = { x1: 100, x2: 300, y1: 100, y2: 300 };

    // if (
    //   data.x >= dropZone.x1 &&
    //   data.x <= dropZone.x2 &&
    //   data.y >= dropZone.y1 &&
    //   data.y <= dropZone.y2
    // ) {
    //   onDrop();
    // }

    // Reset button position (illusion of staying in place)
    setDragPosition({ x: 0, y: 0 });
  };

  return (
    <Draggable
      position={dragPosition}
      onStop={handleDragStop}
      onDrag={(e, data) => setDragPosition({ x: data.x, y: data.y })}
    >
      <button style={{ margin: "20px", cursor: "move" }}>Drag me</button>
    </Draggable>
  );
};

export default DraggableButton;
