import { Droppable } from "../../components/Droppable/Droppable";
import { Draggable } from "../../components/Draggable/Draggable";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

export const NewFormUpdated = () => {
  const [parent, setParent] = useState(null);
  //   const draggable = <Draggable>Go ahead, drag me.</Draggable>;
  //   const draggable2 = <Draggable>Go ahead, drag me.</Draggable>;

  //   return (
  //     <DndContext onDragEnd={handleDragEnd}>
  //       {!parent ? draggable : null}
  //       <Droppable id="droppable">
  //         {parent === "droppable" ? draggable : "Drop here"}
  //       </Droppable>
  //     </DndContext>
  //   );

  //   function handleDragEnd(event: any) {
  //     const { over } = event;

  //     // If the item is dropped over a container, set it as the parent
  //     // otherwise reset the parent to `null`
  //     setParent(over ? over.id : null);
  //   }
  // };
  const [draggables, setDraggables] = useState([
    { id: "1", content: "Go ahead, drag me 1." },
    { id: "2", content: "Go ahead, drag me 2." },
  ]);

  const addDraggable = () => {
    const newId = (draggables.length + 1).toString();
    setDraggables([
      ...draggables,
      { id: newId, content: `Go ahead, drag me ${newId}.` },
    ]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {draggables.map((draggable) =>
        !parent || parent !== `droppable-${draggable.id}` ? (
          <Draggable key={draggable.id} id={draggable.id}>
            {draggable.content}
          </Draggable>
        ) : null
      )}
      <Droppable id="droppable">
        {draggables.map((draggable) =>
          parent === `droppable-${draggable.id}` ? (
            <Draggable key={draggable.id} id={draggable.id}>
              {draggable.content}
            </Draggable>
          ) : null
        )}
        Drop here
      </Droppable>
      <button onClick={addDraggable}>Add Draggable</button>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? `droppable-${active.id}` : null);
  }
};
