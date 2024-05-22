import DraggableButton from "../../components/DraggableButton/DraggableButton";
import Page from "../../components/Page/Page";
import { useState } from "react";
import DNDCanvas from "../../components/DNDCanvas/DNDCanvas";
import styles from "./NewForm.module.css";

type DroppedItemType =
  | "Section"
  | "Heading"
  | "Text"
  | "Date and Time"
  | "Numbers"
  | "Dropdown"
  | "Multiple Choice"
  | "Signature";

interface DroppedItem {
  id: number;
  type: DroppedItemType;
}

const NewForm = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [description, setDescription] = useState("Description");
  const [title, setTitle] = useState("Form Title");

  const draggableButtons = [
    "Heading",
    "Text",
    "Date and Time",
    "Numbers",
    "Dropdown",
    "Multiple Choice",
  ];

  const handleDrop = (label: DroppedItemType) => {
    const newItem: DroppedItem = {
      id: droppedItems.length,
      type: label,
    };
    console.log("new item here: ", newItem);
    setDroppedItems([...droppedItems, newItem]);
  };

  return (
    <Page>
      <div>
        <h1 className={styles.title}>New Form</h1>
        <div className={styles.newFormContainer}>
          <div className={styles.formElementsContainer}>
            <h2 className={styles.subtitle}>Form Elements</h2>
            <hr />
            <DraggableButton
              label="Section"
              onDrop={() => handleDrop("Section")}
            />
            <p className={styles.smallText}>Text Elements</p>
            {draggableButtons.map((label, index) => (
              <DraggableButton
                key={index}
                label={label}
                onDrop={() => handleDrop(label as DroppedItemType)}
              />
            ))}
            <p className={styles.smallText}>Advanced Elements</p>
            <DraggableButton
              label="Signature"
              onDrop={() => handleDrop("Signature")}
            />
          </div>
          <div className={styles.formCanvasContainer}>
            <div className={styles.formTitleContainer}>
              <input
                className={styles.formTitle}
                placeholder="Form Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>
              <hr />
              <input
                className={styles.formDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                value={description}
              ></input>
              <hr />
            </div>
            <p className={styles.smallText}>Drag and Drop Area</p>
            <DNDCanvas items={droppedItems} setItems={setDroppedItems} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NewForm;
