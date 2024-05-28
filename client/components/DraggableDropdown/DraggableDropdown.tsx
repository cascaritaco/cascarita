import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableDropdownProps, Option } from "./types";
import { useEffect, useState } from "react";

const DraggableDropdown: React.FC<DraggableDropdownProps> = ({
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

  const [options, setOptions] = useState(fields);

  useEffect(() => {
    setOptions(fields);
  }, [fields]);

  const addOption = () => {
    append({ ref: `option-${fields.length + 1}`, label: "" });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

  const changeOptionsIndex = (label: string, optionIndex: number) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      label,
    };
    setOptions(updatedOptions);
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
            defaultValue={title}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your question here"
                style={{ width: "100%", marginBottom: "8px" }}
              />
            )}
          />
          <select style={{ width: "100%", marginBottom: "8px" }}>
            {(options as Option[]).map((field, idx) => (
              <option key={field.ref} value={field.ref}>
                {field.label || `Option ${idx + 1}`}
              </option>
            ))}
          </select>
          {fields.map((field, idx) => (
            <div
              key={field.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Controller
                name={`fields.${index}.properties.choices.${idx}.label`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // Ensure the field value is updated in react-hook-form
                      changeOptionsIndex(e.target.value, idx); // Update the selectOptions state
                    }}
                    placeholder={`Option ${idx + 1}`}
                    style={{ flexGrow: 1 }}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => removeOption(idx)}
                style={{ marginLeft: "8px" }}
              >
                Remove Option
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            style={{ marginTop: "8px" }}
          >
            Add Option
          </button>
          <button
            type="button"
            onClick={onDelete}
            style={{ marginTop: "8px", marginLeft: "8px" }}
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableDropdown;
