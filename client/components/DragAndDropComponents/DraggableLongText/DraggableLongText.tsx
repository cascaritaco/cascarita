import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggableLongTextProps } from "./types";
import styles from "./DraggableLongText.module.css";
import DraggableSubMenu from "../DraggableSubMenu/DraggableSubMenu";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import { SMALL_DRAGGABLE_CONTAINER_WIDTH } from "../constants";

const DraggableLongText: React.FC<DraggableLongTextProps> = ({
  id,
  index,
  title,
  validations,
  control,
  onDelete,
  onCopy,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("DraggableFields");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContainerWidthMaxed, setIsContainerWidthMaxed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsContainerWidthMaxed(
          containerRef.current.offsetWidth < SMALL_DRAGGABLE_CONTAINER_WIDTH,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          onClick={handleClick}>
          <div style={{ position: "relative" }} ref={containerRef}>
            <p className={styles.textElementTypeText}>{t("longText")}</p>
            <div
              style={{
                padding: 16,
                margin: "0 0 8px 0",
                background: "#FFFFFF",
                border: "1px solid #DFE5EE",
                borderRadius: 10,
              }}>
              <Controller
                key={index}
                name={`fields.${index}.title`}
                control={control}
                defaultValue={title} // Ensure the default value is set
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
                }`}>
                {validations?.max_length != null && (
                  <>
                    <p className={styles.requiredText}>{t("maxCharacters")}</p>
                    <Controller
                      name={`fields.${index}.validations.max_length`}
                      control={control}
                      defaultValue={validations.max_length}
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
                {validations?.required != null && (
                  <>
                    <p className={styles.requiredText}>{t("requiredText")}</p>
                    <Controller
                      name={`fields.${index}.validations.required`}
                      control={control}
                      defaultValue={validations.required}
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
              {isMenuOpen && (
                <DraggableSubMenu
                  onDelete={onDelete}
                  onCopy={onCopy}
                  onClose={handleClick}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableLongText;
