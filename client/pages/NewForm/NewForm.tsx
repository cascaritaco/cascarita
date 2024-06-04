import DraggableButton from "../../components/DraggableButton/DraggableButton";
import Page from "../../components/Page/Page";
import { useRef, useState } from "react";
import DNDCanvas from "../../components/DNDCanvas/DNDCanvas";
import styles from "./NewForm.module.css";
import { DNDCanvasRef, DroppedItem, DroppedItemType } from "./types";
import { v4 as uuidv4 } from "uuid";
import { Field, Survey } from "../../components/DNDCanvas/types";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";

const NewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fields = location.state?.fields as Field[] | undefined;
  const [formId, setFormId] = useState<string | null>(
    (location.state?.id as string) ?? null,
  );
  const defaultItems = fields
    ? fields.map((field) => ({
        id: field.ref,
        type: toSnakeCase(field.type) as DroppedItemType,
      }))
    : [];
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>(defaultItems);
  const [description, setDescription] = useState(
    location.state?.description ?? "",
  );
  const [title, setTitle] = useState(location.state?.title ?? "Form Title");
  const [surveyLink, setSurveyLink] = useState(location.state?.link ?? null);
  const canvasRef = useRef<DNDCanvasRef>(null);
  const { currentUser } = useAuth();

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

  const onCreate = async (data: Survey) => {
    const surveyData = {
      title,
      welcome_screens: [
        {
          title,
          properties: {
            description,
          },
        },
      ],
      ...data,
    };

    try {
      const response = await fetch("/api/forms/", {
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
      const existingSurveys = JSON.parse(
        localStorage.getItem("surveys") ?? "{}",
      );
      const surveyId = surveyResponseObj.id;
      const link = surveyResponseObj._links.display;
      setSurveyLink(link);
      setFormId(surveyId);
      existingSurveys[formId ?? surveyId] = {
        id: formId ?? surveyId,
        edittedBy: currentUser?.first_name ?? "",
        lastUpdated: new Date().toLocaleString(),
        title,
        description,
        link,
        ...data,
      };
      localStorage.setItem("surveys", JSON.stringify(existingSurveys));
    } catch (err) {
      console.error("Error creating survey:", err);
    }
  };

  const onSave = async (data: Survey) => {
    if (formId == null || formId === undefined) {
      throw new Error("Form ID is undefined");
    }

    const surveyData = {
      title,
      welcome_screens: [
        {
          title,
          properties: {
            description,
          },
        },
      ],
      ...data,
    };

    try {
      const response = await fetch(`/api/survey/${formId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error("Failed to update form");
      }

      // Update the form in local storage
      const surveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
      surveys[formId] = {
        ...surveys[formId],
        edittedBy: currentUser?.first_name ?? "",
        lastUpdated: new Date().toLocaleString(),
        title,
        description,
        ...data,
      };
      localStorage.setItem("surveys", JSON.stringify(surveys));
    } catch (error) {
      console.error(error);
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
            {formId == null ? "New Form" : "Edit Form"}
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
              {formId == null ? "Create" : "Save"}
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
                  saveSurvey={formId == null ? onCreate : onSave}
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
