import DraggableButton from "../../components/DraggableButton/DraggableButton";
import Page from "../../components/Page/Page";
import { useRef, useState } from "react";
import DNDCanvas from "../../components/DNDCanvas/DNDCanvas";
import styles from "./NewForm.module.css";
import { DNDCanvasRef, DroppedItem, DroppedItemType } from "./types";
import { v4 as uuidv4 } from "uuid";
import { Field, Form } from "../../components/DNDCanvas/types";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { useTranslation } from "react-i18next";
import FormResponses from "../../components/FormResponses/FormResponses";
import { toSnakeCase } from "../../util/toSnakeCase";
import { createForm, updateForm } from "../../api/forms/service";

const NewForm = () => {
  const { t } = useTranslation("NewForms");
  const [activeSection, setActiveSection] = useState("questions");
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState<Field[]>(location.state?.fields ?? []);
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
  const [title, setTitle] = useState(
    location.state?.title ?? t("formTitlePlaceHolder"),
  );
  const [formLink, setFormLink] = useState(location.state?.link ?? null);
  const canvasRef = useRef<DNDCanvasRef>(null);
  const { currentUser } = useAuth();

  const draggableButtons = [
    "Short Text",
    "Long Text",
    "Dropdown",
    "Multiple Choice",
    "Email",
    "Phone Number",
  ];

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

  const onCreate = async (data: Form) => {
    const response = await createForm(
      data,
      title,
      description,
      currentUser?.group_id,
    );
    const existingSurveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
    const surveyId = response.form_data.id;
    const link = response.form_data._links.display;
    setFormLink(link);
    setFormId(surveyId);
    setFields(response.form_data.fields);
    existingSurveys[surveyId] = {
      ...response.form_data,
      editedBy: currentUser?.first_name ?? "",
      lastUpdated: new Date().toLocaleString(),
    };
    localStorage.setItem("surveys", JSON.stringify(existingSurveys));
  };

  const onSave = async (data: Form) => {
    if (formId == null || formId === undefined) {
      throw new Error("Form ID is undefined");
    }
    const response = await updateForm(data, formId, title, description);
    // Update the form in local storage
    const surveys = JSON.parse(localStorage.getItem("surveys") ?? "{}");
    setFields(response.fields);
    surveys[formId] = {
      ...response,
      editedBy: currentUser?.first_name ?? "",
      lastUpdated: new Date().toLocaleString(),
    };
    localStorage.setItem("surveys", JSON.stringify(surveys));
  };

  return (
    <Page>
      <div>
        <div className={styles.newFormHeader}>
          <h1 className={styles.title}>
            {formId == null ? t("pageTitleNew") : t("pageTitleEdit")}
          </h1>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}>
              {t("cancelButton")}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}>
              {formId == null ? t("createButton") : t("saveButton")}
            </button>
            {formLink && (
              <a href={formLink} target="_blank" rel="noopener noreferrer">
                <button className={styles.previewButton}>
                  {t("previewButton")}
                </button>
              </a>
            )}
          </div>
        </div>
        <ul className={styles.formNav}>
          <li
            className={
              activeSection === "questions"
                ? styles.activeSection
                : styles.questionsNav
            }
            onClick={() => setActiveSection("questions")}>
            {t("formNavOptions.questions")}
          </li>
          {formId != null && (
            <li
              className={
                activeSection === "responses"
                  ? styles.activeSection
                  : styles.responsesNav
              }
              onClick={() => setActiveSection("responses")}>
              {t("formNavOptions.responses")}
            </li>
          )}
        </ul>
        {activeSection === "questions" && (
          <div className={styles.newFormContainer}>
            <div className={styles.formElementsContainer}>
              <h2 className={styles.subtitle}>{t("formElements")}</h2>
              <hr />
              <p className={`${styles.smallText} ${styles.textElementsText}`}>
                {t("textElements")}
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
                  placeholder={t("descriptionPlaceholder")}
                  value={description}
                />
                <hr />
              </div>
              <p className={styles.smallText} style={{ color: "#b01254" }}>
                {t("sectionText")}
              </p>

              <div className={styles.canvasStyles}>
                <div className={styles.canvasInnerContainer}>
                  <DNDCanvas
                    ref={canvasRef}
                    importedFields={fields}
                    items={droppedItems}
                    handleDelete={handleDelete}
                    handleCopy={handleCopy}
                    saveForm={formId == null ? onCreate : onSave}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {formId != null && activeSection === "responses" && (
          <FormResponses formId={formId} />
        )}
      </div>
    </Page>
  );
};

export default NewForm;
