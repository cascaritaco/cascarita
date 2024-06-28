import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import {
  DragDropContext,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";
import DraggableMultipleChoice from "../DraggableMultipleChoice/DraggableMultipleChoice";
import DraggableShortText from "../DraggableShortText/DraggableShortText";
import DraggableDropdown from "../DraggableDropdown/DraggableDropdown";
import DraggableLongText from "../DraggableLongText/DraggableLongText";
import { DNDCanvasProps, Field, Form } from "./types";
import { DroppedItem } from "../../../pages/NewForm/types";
import EmptyDNDCanvas from "../EmptyDNDCanvas/EmptyDNDCanvas";
import { v4 as uuidv4 } from "uuid";
import DraggablePhoneNumber from "../DraggablePhoneNumber/DraggablePhoneNumber";
import DraggableEmail from "../DraggableEmail/DraggableEmail";
import { StrictModeDroppable } from "../../StrictModeDroppable/StrictModeDroppable";

const DNDCanvas = forwardRef(
  (
    {
      items,
      handleDelete,
      handleCopy,
      saveForm,
      importedFields,
    }: DNDCanvasProps,
    ref,
  ) => {
    const methods = useForm<{ fields: Field[] }>({
      defaultValues: { fields: importedFields ?? [] },
    });

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
      email: DraggableEmail,
      phone_number: DraggablePhoneNumber,
    };

    const appendField = (item: DroppedItem) => {
      const fieldTemplate = {
        multiple_choice: {
          title: "",
          ref: item.id,
          properties: { choices: [] },
          validations: { required: false },
          type: item.type,
        },
        short_text: {
          title: "",
          ref: item.id,
          validations: { max_length: 20, required: false },
          type: item.type,
        },
        dropdown: {
          title: "",
          ref: item.id,
          properties: { choices: [] },
          validations: { required: false },
          type: item.type,
        },
        long_text: {
          title: "",
          ref: item.id,
          validations: { max_length: 100, required: false },
          type: item.type,
        },
        email: {
          title: "",
          ref: item.id,
          validations: { required: false },
          type: item.type,
        },
        phone_number: {
          title: "",
          ref: item.id,
          properties: { default_country_code: "US" },
          validations: { required: false },
          type: item.type,
        },
      };
      append(fieldTemplate[item.type]);
    };

    const { control, handleSubmit } = methods;

    const { fields, append, move, remove, insert } = useFieldArray({
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
      move(result.source.index, result.destination.index);
    };

    const onDelete = (index: number, name: string) => {
      remove(index);
      handleDelete(name);
    };

    const onCopy = (field: Field, index: number) => {
      const newRef = uuidv4();
      delete field.id;
      insert(index + 1, { ...field, ref: newRef });
      handleCopy(index, {
        id: newRef,
        type: field.type,
      });

      // Ensure the copied fields has the same fields as the original
      methods.setValue(
        `fields.${index + 1}.title`,
        methods.getValues(`fields.${index}.title`),
      );

      methods.setValue(
        `fields.${index + 1}.validations`,
        methods.getValues(`fields.${index}.validations`),
      );
    };

    const onSubmit = (data: Form) => {
      saveForm(data);
    };

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="canvas">
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
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field: Field, index: number) => {
                      const Component = componentMap[field.type];
                      if (!Component) return null;

                      return (
                        <Component
                          key={field.ref}
                          id={field.ref}
                          index={index}
                          title={field.title}
                          validations={field.validations}
                          control={methods.control}
                          onDelete={() => onDelete(index, field.ref)}
                          onCopy={() => onCopy(field, index)}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </form>
                </FormProvider>
              )}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    );
  },
);

DNDCanvas.displayName = "DNDCanvas";

export default DNDCanvas;
