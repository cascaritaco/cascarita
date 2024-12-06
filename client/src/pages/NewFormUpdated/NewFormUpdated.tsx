import { useState } from "react";
import FormSideBar from "../../components/FormSideBar/FormSideBar";
import FormCanvas from "../../components/FormCanvas/FormCanvas";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Page from "../../components/Page/Page";

type DraggedItem = {
  id: string;
  label: string;
};

export const NewFormUpdated = () => {
  const handleDragStart = (event: DragStartEvent) => {
    const draggedItem = formElements.find(
      (item) => item.id === event.active.id
    );
    if (draggedItem) {
      setActiveDragItem(draggedItem);
    }
  };
  const [activeDragItem, setActiveDragItem] = useState<DraggedItem | null>(
    null
  );
  const [canvasItems, setCanvasItems] = useState<DraggedItem[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("I AM HERE");
    const { active, over } = event;

    setActiveDragItem(null); // Clear the drag overlay after drop
    // Pass the event to the Canvas component for further processing
    if (
      over?.id === "canvas" &&
      !canvasItems.some((item) => item.id === active.id)
    ) {
      setCanvasItems((prevItems) => [
        ...prevItems,
        {
          id: active.id as string,
          label: activeDragItem?.label || (active.id as string),
        },
      ]);
    }

    // Handle reordering within the canvas
    if (over && over.id !== "canvas") {
      const oldIndex = canvasItems.findIndex((item) => item.id === active.id);
      const newIndex = canvasItems.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setCanvasItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
      }
    }
  };
  const formElements = [
    { id: "Text Field", label: "Text Field" },
    { id: "Checkbox", label: "Checkbox" },
    { id: "Dropdown", label: "Dropdown" },
    { id: "Date Field", label: "Date Field" },
  ];

  return (
    <Page>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ display: "flex" }}>
          <FormSideBar items={formElements} />
          <div style={{ flex: 1, padding: "20px" }}>
            <FormCanvas items={canvasItems} setItems={setCanvasItems} />
          </div>
        </div>
        <DragOverlay>
          {activeDragItem ? (
            <div
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              {activeDragItem.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Page>
  );
};
