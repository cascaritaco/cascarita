import DraggableButton from "../../components/DraggableButton/DraggableButton";
import Page from "../../components/Page/Page";
import { useState } from "react";
import DNDCanvas from "../../components/DNDCanvas/DNDCanvas";
import styles from "./NewForm.module.css";
import { DroppedItem, DroppedItemType } from "./types";
import { v4 as uuidv4 } from "uuid";
import { Survey } from "../../components/DNDCanvas/types";

const NewForm = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [description, setDescription] = useState("Description");
  const [title, setTitle] = useState("Form Title");

  const draggableButtons = [
    "Short Text",
    "Long Text",
    "Dropdown",
    "Multiple Choice",
  ];

  const handleDrop = (label: DroppedItemType) => {
    const uniqueId = uuidv4();
    const newItem: DroppedItem = {
      id: uniqueId,
      type: label,
    };
    console.log("new item here: ", newItem);
    setDroppedItems([...droppedItems, newItem]);
  };

  const handleDelete = (name: string) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== name));
  };

  const saveSurvey = (data: Survey) => {
    const surveyData = {
      title: title,
      description: description,
      ...data,
    };
    const jsonData = JSON.stringify(surveyData, null, 2);
    console.log(jsonData);
    //TODO SEND THE SURVEY TO THE BACKEND
  };

  return (
    <Page>
      <div>
        <h1 className={styles.title}>New Form</h1>
        <div className={styles.newFormContainer}>
          <div className={styles.formElementsContainer}>
            <h2 className={styles.subtitle}>Form Elements</h2>
            <hr />
            <p className={styles.smallText}>Text Elements</p>
            {draggableButtons.map((label, index) => (
              <DraggableButton
                key={index}
                label={label}
                onDrop={() => handleDrop(label as DroppedItemType)}
              />
            ))}
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
            <DNDCanvas
              items={droppedItems}
              handleDelete={handleDelete}
              saveSurvey={saveSurvey}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NewForm;
