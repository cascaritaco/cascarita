import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableShortText from "../SortableShortText/SortableShortText";

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

const FormCanvas: React.FC<FormFields> = ({ fields }) => {
  const { setNodeRef, isOver } = useSortable({ id: "canvas" });

  console.log("fields within FormCanvas: ", fields);

  return (
    <div
      style={{
        border: "1px dashed #ccc",
        padding: "20px",
        minHeight: "400px",
        background: isOver ? "#f0f0f0" : "#fff",
      }}
      ref={setNodeRef}
      onClick={() => console.log("clicked")}
    >
      <SortableContext
        items={fields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        {fields.map((field, index) => (
          <SortableShortText index={index} formField={field} />
        ))}
      </SortableContext>
    </div>
  );
};

export default FormCanvas;
