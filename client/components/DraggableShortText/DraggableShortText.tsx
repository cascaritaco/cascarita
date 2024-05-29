import React from "react";
import { Controller } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableShortTextProps } from "./types";
import styles from "./DraggableShortText.module.css";
const DraggableShortText: React.FC<DraggableShortTextProps> = ({
  id,
  index,
  title,
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
          }}>
          <p className={styles.textElementTypeText}>Short Text</p>
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
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableShortText;
