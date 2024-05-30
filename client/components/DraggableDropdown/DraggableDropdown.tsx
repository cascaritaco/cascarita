import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableDropdownProps } from "./types";
import { useEffect, useState } from "react";
import styles from "./DraggableDropdown.module.css";
import MinusCircleIcon from "../../assets/MinusCircleIcon";
import PlusCircleIcon from "../../assets/PlusCircleIcon";
import DraggableSubMenu from "../DraggableSubMenu/DraggableSubMenu";

const DraggableDropdown: React.FC<DraggableDropdownProps> = ({
  id,
  index,
  title,
  control,
  onDelete,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
          }}
          onClick={handleClick}>
          <div style={{ position: "relative" }}>
            <p className={styles.textElementTypeText}>Dropdown</p>
            <div
              style={{
                padding: 16,
                margin: "0 0 8px 0",
                background: "#FFFFFF",
                border: "1px solid #DFE5EE",
                borderRadius: 10,
              }}>
              <Controller
                name={`fields.${index}.title`}
                control={control}
                defaultValue={title}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      placeholder="Question"
                      className={styles.question}
                    />
                    <hr />
                  </>
                )}
              />
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}>
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
                        style={{
                          marginLeft: -5,
                          marginRight: -5,
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(idx)}
                    style={{ marginLeft: "8px" }}>
                    <MinusCircleIcon width={20} height={20} color={"#FF0000"} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                style={{
                  display: "flex",
                  marginTop: 10,
                }}>
                <PlusCircleIcon width={20} height={20} color={"#4171ED"} />
              </button>
              {isMenuOpen && (
                <DraggableSubMenu onDelete={onDelete} onClose={handleClick} />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableDropdown;
