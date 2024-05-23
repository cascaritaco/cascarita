import React from "react";
import { Controller } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";

interface DraggableShortTextProps {
  id: string;
  index: number;
  label: string;
  control: any; // Type as appropriate
  onDelete: () => void;
}

const DraggableShortText: React.FC<DraggableShortTextProps> = ({
  id,
  index,
  label,
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
          {/* Render label input */}
          <Controller
            name={`questions.${index}.label`}
            control={control}
            defaultValue={label} // Ensure the default value is set
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your label here"
                style={{ width: "100%", marginBottom: "8px" }}
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

export default DraggableShortText;
