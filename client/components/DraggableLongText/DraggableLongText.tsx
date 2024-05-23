import React from "react";
import { Controller } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableLongTextProps } from "./types";

const DraggableLongText: React.FC<DraggableLongTextProps> = ({
  id,
  index,
  question,
  control,
  onDelete,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            padding: 16,
            margin: "0 0 8px 0",
            background: "#f0f0f0",
            borderRadius: 4,
          }}
        >
          <Controller
            name={`questions.${index}.question`}
            control={control}
            defaultValue={question} // Ensure the default value is set
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your question here"
                style={{ width: "100%", marginBottom: "8px" }}
              />
            )}
          />
          <Controller
            name={`questions.${index}.longText`}
            control={control}
            defaultValue="" // Ensure the default value is set
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter long text here"
                style={{ width: "100%", marginBottom: "8px", height: "150px" }}
              />
            )}
          />
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableLongText;
