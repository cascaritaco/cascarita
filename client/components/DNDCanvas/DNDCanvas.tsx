import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";
import DraggableMultipleChoice from "../DraggableMultipleChoice/DraggableMultipleChoice";
import DraggableShortText from "../DraggableShortText/DraggableShortText";
import DraggableDropdown from "../DraggableDropdown/DraggableDropdown";
import DraggableLongText from "../DraggableLongText/DraggableLongText";
import { DNDCanvasProps, Field, Survey } from "./types";
import { DroppedItem } from "../../pages/NewForm/types";
import EmptyDNDCanvas from "../EmptyDNDCanvas/EmptyDNDCanvas";

const DNDCanvas = forwardRef(
  ({ items, handleDelete, saveSurvey }: DNDCanvasProps, ref) => {
    const methods = useForm<{ fields: Field[] }>();

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        methods.handleSubmit(onSubmit)();
      },
    }));
    const componentMap = {
      multiple_choice: DraggableMultipleChoice,
      short_text: DraggableShortText,
      dropdown: DraggableDropdown,
      long_text: DraggableLongText,
    };

    const appendField = (item: DroppedItem) => {
      switch (item.type) {
        case "multiple_choice":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            properties: { choices: [] },
          });
          break;
        case "short_text":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            validations: {
              max_length: 20,
              required: false,
            },
          });
          break;
        case "dropdown":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            properties: { choices: [] },
          });
          break;
        case "long_text":
          append({
            ref: item.id,
            type: item.type,
            title: "",
            validations: {
              max_length: 100,
              required: false,
            },
          });
          break;
        default:
          break;
      }
    };

    const { control, handleSubmit } = methods;

    const { fields, append, move, remove } = useFieldArray({
      control,
      name: "fields", // This should match the structure in useForm
    });

    useEffect(() => {
      if (items.length > 0) {
        items.forEach((item) => {
          if (!fields.some((field) => field.ref === item.id)) {
            appendField(item);
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
              {(provided: DroppableProvided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  style={{
                    padding: "16px",
                    background: "white",
                    minHeight: "400px",
                  }}>
                  {items.length === 0 ? (
                    <EmptyDNDCanvas />
                  ) : (
                    fields.map((field: Field, index: number) => {
                      const Component = componentMap[field.type];
                      if (!Component) return null;

                      return (
                        <Component
                          key={index}
                          id={index.toString()}
                          index={index}
                          title={field.title}
                          control={control}
                          onDelete={() => onDelete(index, field.ref)}
                        />
                      );
                    })
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </form>
      </FormProvider>
    );
  },
);

DNDCanvas.displayName = "DNDCanvas";

export default DNDCanvas;
