import { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import FormSideBar from "../../components/FormSideBar/FormSideBar";
import FormCanvas from "../../components/FormCanvas/FormCanvas";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import Page from "../../components/Page/Page";

type DraggedItem = {
  id: string;
  label: string;
  type: string; // Add the type property
};

type FormFields = {
  fields: {
    id: string;
    label: string;
    type: string; // Field type (e.g., TextField, Dropdown)
    validations?: {
      max_length?: number;
      required?: boolean;
    }; // Optional validations
  }[];
};

export const NewFormUpdated = () => {
  const methods = useForm<FormFields>({
    defaultValues: { fields: [] },
  });

  const { control } = methods;
  const { fields, append, move } = useFieldArray({
    control,
    name: "fields",
  });

  const [activeDragItem, setActiveDragItem] = useState<DraggedItem | null>(
    null
  );

  const formElements = [
    { id: "Short Text", label: "Short Text", type: "text" },
    { id: "Checkbox", label: "Checkbox", type: "checkbox" },
    { id: "Dropdown", label: "Dropdown", type: "dropdown" },
    { id: "Date Field", label: "Date Field", type: "date" },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const draggedItem = formElements.find(
      (item) => item.id === event.active.id
    );
    if (draggedItem) {
      setActiveDragItem(draggedItem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveDragItem(null); // Clear the drag overlay

    // If dropped into the canvas
    console.log("FIELDS FROM NEW FORM", fields);
    console.log("active id: ", active);
    console.log("over id: ", over);
    if (over?.id === "canvas") {
      console.log("appending to form fields");
      append({
        id: active.id as string,
        label: activeDragItem?.label || (active.id as string),
        type: activeDragItem?.type || "text",
        validations:
          activeDragItem?.type === "text"
            ? { max_length: 100, required: false }
            : undefined,
      });
    }

    // Handle reordering within the canvas
    if (over && over.id !== "canvas") {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
    }
  };

  return (
    <Page>
      <FormProvider {...methods}>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div style={{ display: "flex" }}>
            <FormSideBar items={formElements} />
            <div style={{ flex: 1, padding: "20px" }}>
              <FormCanvas fields={fields} />
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
      </FormProvider>
    </Page>
  );
};
