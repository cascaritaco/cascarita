import DraggableButton from "../../components/DraggableButton/DraggableButton";
import Page from "../../components/Page/Page";
import { useRef, useState } from "react";
import DNDCanvas from "../../components/DNDCanvas/DNDCanvas";
import styles from "./NewForm.module.css";
import { DNDCanvasRef, DroppedItem, DroppedItemType } from "./types";
import { v4 as uuidv4 } from "uuid";
import { Field, Survey } from "../../components/DNDCanvas/types";
import { useNavigate, useLocation } from "react-router-dom";

const NewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fields = location.state?.fields as Field[] | undefined;
  const id = location.state?.id as string | undefined;
  const defaultItems = fields
    ? fields.map((field) => ({
        id: field.ref,
        type: toSnakeCase(field.type) as DroppedItemType,
      }))
    : [];
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>(defaultItems);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("Form Title");
  const [surveyLink, setSurveyLink] = useState(null);
  const canvasRef = useRef<DNDCanvasRef>(null);

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

  const handleCancel = () => {
    navigate(-1);
  };

  const handleDelete = (name: string) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== name));
  };

  const handleCopy = (index: number, copiedItem: DroppedItem) => {
    const updatedItems = [...droppedItems];
    updatedItems.splice(index + 1, 0, copiedItem);
    setDroppedItems(updatedItems);
  };

  const handleSubmit = () => {
    if (canvasRef.current) {
      canvasRef.current.submitForm();
    }
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

    const existingSurveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
    const surveyID = uuidv4();
    existingSurveys[id ?? surveyID] = { id: id ?? surveyID, ...data };
    localStorage.setItem("surveys", JSON.stringify(existingSurveys));

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
        <div
          className={styles.newFormHeader}
          style={{
            borderBottom: "1px solid #DFE5EE",
            marginBottom: 15,
            marginRight: 33,
          }}>
          <h1 className={styles.title}>
            {fields == null ? "New Form" : "Edit Form"}
          </h1>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}>
              Submit
            </button>
            {surveyLink && (
              <a href={surveyLink} target="_blank" rel="noopener noreferrer">
                <button className={styles.previewButton}>Preview Survey</button>
              </a>
            )}
          </div>
        </div>
        <div className={styles.newFormContainer}>
          <div className={styles.formElementsContainer}>
            <h2 className={styles.subtitle}>Form Elements</h2>
            <hr />
            <p className={styles.smallText} style={{ paddingTop: 8 }}>
              Text Elements
            </p>
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
              <div style={{ paddingBottom: 8 }}>
                <input
                  className={styles.formTitle}
                  placeholder="Form Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <hr />
              </div>
              <input
                className={styles.formDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                value={description}
              />
              <hr />
            </div>
            <p className={styles.smallText} style={{ color: "#b01254" }}>
              Section
            </p>

            <div className={styles.canvasStyles}>
              <div className={styles.canvasInnerContainer}>
                <DNDCanvas
                  ref={canvasRef}
                  importedFields={fields}
                  items={droppedItems}
                  handleDelete={handleDelete}
                  handleCopy={handleCopy}
                  saveSurvey={saveSurvey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NewForm;
