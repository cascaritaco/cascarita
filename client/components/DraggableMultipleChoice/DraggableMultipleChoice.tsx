import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableMultipleChoiceProps } from "./types";
import styles from "./DraggableMultipleChoice.module.css";
import PlusCircleIcon from "../../assets/PlusCircleIcon";
import MinusCircleIcon from "../../assets/MinusCircleIcon";
import EllipseIcon from "../../assets/EllipseIcon";

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
          }}>
          <p className={styles.textElementTypeText}>Multiple Choice</p>
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
              defaultValue={title} // Ensure the default value is set
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
                <EllipseIcon
                  width={15}
                  height={15}
                  color={"#AAAAAA"}
                  fill={"white"}
                />
                <Controller
                  name={`fields.${index}.properties.choices.${idx}.label`}
                  control={control}
                  render={({ field }) => (
                    <input {...field} placeholder={`Option ${idx + 1}`} />
                  )}
                />
                <button type="button" onClick={() => removeOption(idx)}>
                  <MinusCircleIcon width={25} height={25} color={"#FF0000"} />
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
              <PlusCircleIcon width={25} height={25} color={"#4171ED"} />
            </button>
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableMultipleChoice;
