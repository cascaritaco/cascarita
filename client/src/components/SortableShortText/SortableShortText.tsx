import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMove } from "react-icons/fi"; // Icon for drag handle
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import styles from "./SortableShortText.module.css";

const SMALL_DRAGGABLE_CONTAINER_WIDTH = 800;

type DraggableProps = {
  index: number;
  formField: any;
};

const SortableShortText: React.FC<DraggableProps> = ({ index, formField }) => {
  const { t } = useTranslation("DraggableFields");
  const { control } = useFormContext();

  const [isContainerWidthMaxed, setIsContainerWidthMaxed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: formField.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: "auto",
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsContainerWidthMaxed(
          containerRef.current.offsetWidth < SMALL_DRAGGABLE_CONTAINER_WIDTH
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        style={{ position: "relative" }}
        className={styles.draggableContainer}
        ref={containerRef}
      >
        {/* Draggable Icon (Drag Handle) */}
        <div
          ref={setActivatorNodeRef} // Make this element the drag handle
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
          }}
          {...listeners} // Pass listeners for drag events
        >
          <FiMove size={20} />
        </div>

        <p className={styles.textElementTypeText}>{t("shortText")}</p>
        <div className={styles.draggableContent}>
          {/* Main Input Field */}
          <Controller
            name={`fields.${index}.label`} // Bind to the label of the field
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  placeholder={t("questionPlaceholder")}
                  className={styles.question}
                />
                <hr />
              </>
            )}
          />
          <div
            className={`${styles.extraOptions} ${
              isContainerWidthMaxed ? styles.containerSmall : ""
            }`}
          >
            {/* Maximum Length Validation */}
            {formField.validations?.max_length != null && (
              <>
                <p className={styles.requiredText}>{t("maxCharacters")}</p>
                <Controller
                  name={`fields.${index}.validations.max_length`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        min={0}
                        max={10000}
                        placeholder={"0 - 10,000"}
                        className={styles.requiredText}
                      />
                      <hr />
                    </>
                  )}
                />
              </>
            )}
            {/* Required Switch */}
            {formField.validations?.required != null && (
              <>
                <p className={styles.requiredText}>{t("requiredText")}</p>
                <Controller
                  name={`fields.${index}.validations.required`}
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={(checked) => field.onChange(checked)}
                      offColor="#DFE5EE"
                      onColor="#DFE5EE"
                      offHandleColor="#AAAAAA"
                      onHandleColor="#B01254"
                      handleDiameter={24}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={16}
                      width={44}
                    />
                  )}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortableShortText;
