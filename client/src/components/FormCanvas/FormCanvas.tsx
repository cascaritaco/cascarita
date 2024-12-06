import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem/SortableItem";

type CanvasProps = {
  items: { id: string; label: string }[];
  setItems: React.Dispatch<
    React.SetStateAction<{ id: string; label: string }[]>
  >;
};

const FormCanvas: React.FC<CanvasProps> = ({ items, setItems }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  //   const handleSort = (activeId: string, overId: string) => {
  //     const oldIndex = items.findIndex((item) => item.id === activeId);
  //     const newIndex = items.findIndex((item) => item.id === overId);
  //     setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
  //   };

  const canvasStyle = {
    border: "1px dashed #ccc",
    padding: "20px",
    minHeight: "400px",
    background: isOver ? "#f0f0f0" : "#fff",
  };

  return (
    <div ref={setNodeRef} style={canvasStyle}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            label={item.label}
            // onSort={handleSort}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default FormCanvas;
