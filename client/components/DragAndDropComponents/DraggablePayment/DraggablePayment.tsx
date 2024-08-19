import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import { DraggablePaymentProps } from "./types";
import styles from "./DraggablePayment.module.css";
import DraggableSubMenu from "../DraggableSubMenu/DraggableSubMenu";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import { SMALL_DRAGGABLE_CONTAINER_WIDTH } from "../constants";
import { formatPayment } from "../../../util/formatPayment";

const DraggablePayment: React.FC<DraggablePaymentProps> = ({
  id,
  index,
  title,
  control,
  validations,
  properties,
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
            <p className={styles.textElementTypeText}>{t("payment")}</p>
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
                  <input
                    {...field}
                    placeholder={t("title")}
                    className={styles.question}
                  />
                )}
              />
              {properties?.description != null && (
                <Controller
                  name={`fields.${index}.properties.description`}
                  control={control}
                  defaultValue={properties?.description}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder={t("description")}
                      className={styles.question}
                    />
                  )}
                />
              )}
              <hr />
              {properties?.price != null && (
                <>
                  <div className={styles.payment}>
                    <p className={styles.paymentText}>{t("paymentAmount")}: </p>
                    <div className={styles.paymentInputGroup}>
                      <p className={styles.currencySymbol}>$</p>
                      <Controller
                        key={index}
                        name={`fields.${index}.properties.price.value`}
                        control={control}
                        defaultValue={properties.price.value}
                        render={({ field }) => (
                          <input
                            {...field}
                            value={formatPayment(field.value)}
                            placeholder={"0.00"}
                            className={styles.paymentInput}
                          />
                        )}
                      />
                    </div>
                    <p className={styles.currency}>
                      {properties.price?.currency}
                    </p>
                  </div>
                </>
              )}
              {/* TODO: Add Stripe Accounts */}
              <select className={styles.input}>
                <option value="">Select an Account</option>
                <option value="1">Account 1</option>
                <option value="2">Account 2</option>
                <option value="3">Account 3</option>
              </select>
              <div
                className={`${styles.extraOptions} ${
                  isContainerWidthMaxed ? styles.containerSmall : ""
                }`}>
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
      )}
    </Draggable>
  );
};

export default DraggablePayment;
