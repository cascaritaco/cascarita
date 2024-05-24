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
  const methods = useForm<{ fields: Field[] }>();

  const { control, handleSubmit } = methods;

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "fields", // This should match the structure in useForm
  });

  useEffect(() => {
    if (items.length > 0) {
      items.forEach((item) => {
        if (!fields.some((field) => field.ref === item.id)) {
          if (item.type === "multiple_choice") {
            append({
              // NOTE: TypeForm does NOT extra keys, but if
              // build custom surveys we will need to store this ref
              // id: `${fields.length + 1}`,
              ref: item.id,
              type: item.type,
              title: "",
              properties: { choices: [] },
            });
          } else if (item.type === "short_text") {
            append({
              // id: `${fields.length + 1}`,
              ref: item.id,
              type: item.type,
              title: "",
              validations: {
                max_length: 20,
                required: false,
              },
            });
          } else if (item.type == "dropdown") {
            append({
              // id: `${fields.length + 1}`,
              ref: item.id,
              type: item.type,
              title: "",
              properties: { choices: [] },
            });
          } else if (item.type == "long_text") {
            append({
              // id: `${fields.length + 1}`,
              ref: item.id,
              type: item.type,
              title: "",
              validations: {
                max_length: 100,
                required: false,
              },
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
                  if (field.type === "multiple_choice") {
                    return (
                      <DraggableMultipleChoice
                        key={field.id}
                        id={field.id}
                        index={index}
                        title={field.title}
                        control={control}
                        onDelete={() => onDelete(index, field.ref)}
                      />
                    );
                  } else if (field.type === "short_text") {
                    return (
                      <DraggableShortText
                        key={field.id}
                        id={field.id}
                        index={index}
                        title={field.title}
                        control={control}
                        onDelete={() => onDelete(index, field.ref)}
                      />
                    );
                  } else if (field.type === "dropdown") {
                    return (
                      <DraggableDropdown
                        key={field.id}
                        id={field.id}
                        index={index}
                        title={field.title}
                        control={control}
                        onDelete={() => onDelete(index, field.ref)}
                      />
                    );
                  } else if (field.type === "long_text") {
                    return (
                      <DraggableLongText
                        key={field.id}
                        id={field.id}
                        index={index}
                        title={field.title}
                        control={control}
                        onDelete={() => onDelete(index, field.ref)}
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
