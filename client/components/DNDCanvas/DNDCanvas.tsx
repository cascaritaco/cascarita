import React, { useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DraggableMultipleChoice from "../DraggableMultipleChoice/DraggableMultipleChoice";
import DraggableShortText from "../DraggableShortText/DraggableShortText";
import DraggableDropdown from "../DraggableDropdown/DraggableDropdown";
import DraggableLongText from "../DraggableLongText/DraggableLongText";
import { DNDCanvasProps, Field, Survey } from "./types";

const DNDCanvas: React.FC<DNDCanvasProps> = ({
  items,
  handleDelete,
  saveSurvey,
}) => {
  const methods = useForm<{ questions: Field[] }>();

  const { control, handleSubmit } = methods;

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "questions", // This should match the structure in useForm
  });

  useEffect(() => {
    if (items.length > 0) {
      items.forEach((item) => {
        if (!fields.some((field) => field.name === item.id)) {
          if (item.type === "Multiple Choice") {
            append({
              id: `${fields.length + 1}`,
              name: item.id,
              type: "Multiple Choice",
              question: `Question ${fields.length + 1}`,
              options: [{ id: "option-1", value: "" }],
            });
          } else if (item.type === "Short Text") {
            append({
              id: `${fields.length + 1}`,
              name: item.id,
              type: "Short Text",
              label: `Label ${fields.length + 1}`,
            });
          } else if (item.type == "Dropdown") {
            append({
              id: `${fields.length + 1}`,
              name: item.id,
              type: "Dropdown",
              label: `Label ${fields.length + 1}`,
            });
          } else if (item.type == "Long Text") {
            append({
              id: `${fields.length + 1}`,
              name: item.id,
              type: "Long Text",
              longText: "test",
            });
          }
        }
      });
    }
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Reorder items array
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    // Reorder fields in react-hook-form
    move(result.source.index, result.destination.index);
  };

  const onDelete = (index: number, name: string) => {
    remove(index);
    handleDelete(name);
  };

  const onSubmit = (data: Survey) => {
    saveSurvey(data);
    // console.log("Form Data:", data);

    // // Convert the data object to a JSON string
    // const jsonData = JSON.stringify(data, null, 2);

    // // Write the JSON data to a file
    // console.log(jsonData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="canvas">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  padding: "16px",
                  background: "#eee",
                  minHeight: "400px",
                }}
              >
                {fields.map((field, index) => {
                  if (field.type === "Multiple Choice") {
                    return (
                      <DraggableMultipleChoice
                        key={field.id}
                        id={field.id}
                        index={index}
                        question={field.question || ""}
                        control={control}
                        onDelete={() => onDelete(index, field.name)}
                      />
                    );
                  } else if (field.type === "Short Text") {
                    return (
                      <DraggableShortText
                        key={field.id}
                        id={field.id}
                        index={index}
                        question={field.question || ""}
                        label={field.label || ""}
                        control={control}
                        onDelete={() => onDelete(index, field.name)}
                      />
                    );
                  } else if (field.type === "Dropdown") {
                    return (
                      <DraggableDropdown
                        key={field.id}
                        id={field.id}
                        index={index}
                        question={field.question || ""}
                        control={control}
                        onDelete={() => onDelete(index, field.name)}
                      />
                    );
                  } else if (field.type === "Long Text") {
                    return (
                      <DraggableLongText
                        key={field.id}
                        id={field.id}
                        index={index}
                        question={field.question || ""}
                        label={field.label || ""}
                        control={control}
                        onDelete={() => onDelete(index, field.name)}
                      />
                    );
                  }
                  return null;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default DNDCanvas;
