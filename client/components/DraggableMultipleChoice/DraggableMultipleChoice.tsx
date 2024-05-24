import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableMultipleChoiceProps } from "./types";

const DraggableMultipleChoice: React.FC<DraggableMultipleChoiceProps> = ({
  id,
  index,
  title,
  control,
  onDelete,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fields.${index}.properties.choices`,
  });

  const addOption = () => {
    append({ ref: `option-${fields.length + 1}`, label: "" });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

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
            name={`fields.${index}.title`}
            control={control}
            defaultValue={title} // Ensure the default value is set
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your question here"
                style={{ width: "100%", marginBottom: "8px" }}
              />
            )}
          />
          {fields.map((field, idx) => (
            <div key={field.id}>
              <Controller
                name={`fields.${index}.properties.choices.${idx}.label`}
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder={`Option ${idx + 1}`} />
                )}
              />
              <button type="button" onClick={() => removeOption(idx)}>
                Remove Option
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption}>
            Add Option
          </button>
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableMultipleChoice;
