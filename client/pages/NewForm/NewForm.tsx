import DraggableButton from "../../components/DragableButton/DragableButton";
import Page from "../../components/Page/Page";
import { useState } from "react";

const NewForm = () => {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const handleDrop = () => {
    //Once we drop and we know which item we drop we can make a component
    setDroppedItems([...droppedItems, "New Item"]);
  };

  return (
    <Page>
      <div>
        <h1>Forms</h1>
        <DraggableButton onDrop={handleDrop} />
        <div>Drop Here</div>
      </div>
    </Page>
  );
};

export default NewForm;
