import React, { useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DraggableMultipleChoice from "../DraggableMultipleChoice/DraggableMultipleChoice";
import { DNDCanvasProps } from "./types";

interface DroppedItem {
  id: number;
  type: "Multiple Choice"; // Add other types as needed
}

const DNDCanvas: React.FC<DNDCanvasProps> = ({ items, setItems }) => {
  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, move, replace } = useFieldArray({
    control,
    name: "questions",
  });

  useEffect(() => {
    // // replace(items);
    // // handleDrop();
    // console.log("items: ", items);
    if (items.length > 0) {
      append({
        type: "Multiple Choice",
        // @ts-ignore
        options: [{ id: "option-1", value: "" }],
      });
    }
  }, [items]);

  console.log("fields: ", fields);

  const onDragEnd = (result: DropResult) => {
    console.log("HANDING onDragEnd FROM DND CANVAS");

    if (!result.destination) return;

    // Reorder items array
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    // setItems(updatedItems);

    // Reorder fields in react-hook-form
    move(result.source.index, result.destination.index);
  };

  const handleDrop = (e: React.DragEvent) => {
    // console.log("HANDING DROP FROM DND CANVAS");
    // e.preventDefault();
    // const type = e.dataTransfer.getData("text/plain") as DroppedItem["type"];
    // console.log("type: ", type);
    // if (type === "Multiple Choice") {
    //   const newItem: DroppedItem = {
    //     id: items.length,
    //     type: "Multiple Choice",
    //   };
    //   // setItems([...items, newItem]);
    //   // append({
    //   //   type: "Multiple Choice",
    //   //   options: [{ id: "option-1", value: "" }],
    //   // });
    //   append({
    //     type: "Multiple Choice",
    //     // @ts-ignore
    //     options: [{ id: "option-1", value: "" }],
    //   });
    // }
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to a file
    console.log(jsonData);
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
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  padding: "16px",
                  background: "#eee",
                  minHeight: "400px",
                }}
              >
                {fields.map(
                  (field, index) => (
                    // field.type === "Multiple Choice" ? (
                    <DraggableMultipleChoice
                      key={field.id}
                      id={field.id}
                      index={index}
                      question={`Question ${index + 1}`}
                      control={control}
                    />
                  )
                  // ) : null
                )}
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
