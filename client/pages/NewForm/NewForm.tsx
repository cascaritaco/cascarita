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
  const [surveyLink, setSurveyLink] = useState(null);

  const draggableButtons = [
    "Short Text",
    "Long Text",
    "Dropdown",
    "Multiple Choice",
  ];

  function toSnakeCase(str: string) {
    return str.toLowerCase().replace(/\s+/g, "_");
  }

  const handleDrop = (label: DroppedItemType) => {
    const uniqueId = uuidv4();
    const newItem: DroppedItem = {
      id: uniqueId,
      type: toSnakeCase(label) as DroppedItemType,
    };
    setDroppedItems([...droppedItems, newItem]);
  };

  const handleDelete = (name: string) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== name));
  };

  const saveSurvey = async (data: Survey) => {
    const surveyData = {
      title: title,
      welcome_screens: [
        {
          title: title,
          properties: {
            description: description,
          },
        },
      ],
      ...data,
    };

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const surveyResponseObj = await response.json();
      setSurveyLink(surveyResponseObj._links.display);
    } catch (err) {
      console.error("Error creating survey:", err);
    }
  };

  return (
    <Page>
      <div>
        <h1 className={styles.title}>New Form</h1>
        {surveyLink && (
          <a href={surveyLink} target="_blank" rel="noopener noreferrer">
            <button>Preview Survey</button>
          </a>
        )}
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
